from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# from django.core.paginator import Paginator

import json
from datetime import datetime

from .models import User, Team, Account, Cell, Post

@login_required
@csrf_exempt
def accounts(request):
    try:
        ig_accounts = Account.objects.filter(user=request.user.id)
    except Account.DoesNotExist:
        return JsonResponse({"error": "Error"}, status=404)

    if request.method == "GET":
        return JsonResponse([account.serialize() for account in ig_accounts], safe=False)
        
    if request.method == "POST":
        data = json.loads(request.body)

        user = User.objects.get(pk=request.user.id)

        account = Account.objects.create(username = data.get("account"))
        account.user.add(user)

        return JsonResponse({
            "message": "Account added successfully", 
            "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
            "id": account.id,
            "account": account.serialize()
        }, status=201)

    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)

    return HttpResponse("beep")
    

@csrf_exempt
def grid(request, account):

    try:
        cells = Cell.objects.filter(account__username__icontains=account)
    except Cell.DoesNotExist:
        return JsonResponse({"error": "Account not found."}, status=404)

    if request.method == "GET":
        return JsonResponse([cell.serialize() for cell in cells], safe=False)

    elif request.method == "PUT":

        grid = json.loads(request.body).get("grid")
        grid_len = len(grid)

        for index, cell in enumerate(grid):
            modifiedCell = Cell.objects.get(pk=cell['postId'])
            modifiedCell.position = grid_len
            modifiedCell.save()
            grid_len -= 1

        return JsonResponse(grid, safe=False)


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


