from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
# from django.core.paginator import Paginator

import json
from datetime import datetime

from .models import User, Team, Account, Cell, Post

#GET - Fetch all the team members
#POST - Add new team members
#DELETE - delete team members
@login_required
@csrf_exempt
def team(request):
    if request.method == "GET":
        try:
            team_members = Team.objects.filter(owner=request.user.id)
            print(team_members)
            for mem in team_members:
                print(mem.member.all())
        except Team.DoesNotExist:
            return JsonResponse({"error": "Error"}, status=404)

        return HttpResponse("beep")
        team_members_json = [{
            "id": mem.id,
            "username": mem.username,
            "email": mem.email
        } for mem in team_members ]
        return JsonResponse(team_members_json, safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            owner = User.objects.get(pk=request.user.id)
            new_member = User.objects.get(email=data.get("email"))

            member = Team.objects.create(owner=owner)
            member.member.set([new_member])

            return JsonResponse({
            "message": "Team member added successfully", 
            "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
            "id": member.id,
            "member": {
                "id": member.id,
                "username": member.username,
                "email": member.email
            }
        }, status=201)

        except Team.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)


    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)


#GET - For fetching accounts that a user owns
#POST - For adding new accounts
@login_required
@csrf_exempt
def accounts(request):

    if request.method == "GET":
        try:
            ig_accounts = Account.objects.filter(owner=request.user.id)
        except Account.DoesNotExist:
            return JsonResponse({"error": "Error"}, status=404)
        return JsonResponse([account.serialize() for account in ig_accounts], safe=False)
        
    if request.method == "POST":
        data = json.loads(request.body)
        user = User.objects.get(pk=request.user.id)
        account = Account.objects.create(username = data.get("account"), owner = user)

        return JsonResponse({
            "message": "Account added successfully", 
            "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
            "id": account.id,
            "account": account.serialize()
        }, status=201)

    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)

    return HttpResponse("beep")
    

#GET - fetch all the cells of an account
#PUT - moving the cells' position
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


