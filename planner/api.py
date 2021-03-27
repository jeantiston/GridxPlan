from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# from django.core.paginator import Paginator

import json
from datetime import datetime

from .models import User, Team, Account, Cell, Post

# @login_required

def accounts(request):
    try:
        ig_accounts = Account.objects.filter(user=request.user.id)
    except Account.DoesNotExist:
        return JsonResponse({"error": "Error"}, status=404)

    if request.method == "GET":
        return JsonResponse([account.serialize() for account in ig_accounts], safe=False)
        
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)
    print(ig_accounts)
    print(request.user.id)
    return HttpResponse("beep")
    

def grid(request, account):
    print(request)
    print(request.user)
    try:
        cells = Cell.objects.filter(account__username__icontains=account)
    except Cell.DoesNotExist:
        return JsonResponse({"error": "Account not found."}, status=404)

    if request.method == "GET":
        # console.log("grid")
        return JsonResponse([cell.serialize() for cell in cells], safe=False)

    elif request.method == "PUT":
        pass
        # console.log("moving a cell")

    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

def post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Account not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(post.serialize())
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)


