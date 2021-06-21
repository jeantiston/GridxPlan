from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse

import os
import boto3
from botocore.config import Config

from .models import User


def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("planner"))

    return render(request, "planner/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("planner"))
        else:
            return render(request, "planner/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "planner/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "planner/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "planner/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("planner"))
    else:
        return render(request, "planner/register.html")

def sign_s3(request):
    if request.method == "GET":
        S3_BUCKET = os.environ.get('S3_BUCKET')

        file_name = request.GET.get('file_name')
        file_type = request.GET.get('file_type')

        s3 = boto3.client('s3')
        # s3 = boto3.client('s3', config = Config(signature_version = 's3v4', region_name = 'ap-southeast-1'))

        presigned_post = s3.generate_presigned_post(
            Bucket = S3_BUCKET,
            Key = file_name,
            Fields = {"acl": "public-read", "Content-Type": file_type},
            Conditions = [
                {"acl": "public-read"},
                {"Content-Type": file_type}
            ],
            ExpiresIn = 3600
        )

        return JsonResponse({
            'data': presigned_post,
            'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
            # 'url': 'https://%s.s3.ap-southeast-1.amazonaws.com/%s' % (S3_BUCKET, file_name)
        })

    else:
        return JsonResponse({ "error": "POST request required."}, status=400)
