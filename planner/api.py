from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

import json
from datetime import datetime

from .models import User, Team, Account, Cell, Post, Comment

#GET - Fetch all the team members
#POST - Add new team members
#DELETE - delete team members
@login_required
@csrf_exempt
def team(request, account):
    if request.method == "GET":
        try:
            team = Team.objects.get(account__username=account)
        except Team.DoesNotExist:
            return JsonResponse({"error": "Team not found"}, status=404)

        return JsonResponse(team.serialize(), safe=False)

    if request.method == "POST":
        try:
            team = Team.objects.get(account__username=account)
            data = json.loads(request.body)

            if team.account.owner.id == request.user.id:
                print(data.get("email"))
                new_member = User.objects.get(email=data.get("email"))
                team.member.add(new_member)
            
            else:
                return JsonResponse({"error": "Forbidden: You don't have permission to add members. Contact account owner."}, status=403)

            return JsonResponse({
            "message": "Team member added successfully", 
            "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
            "member": {
                "id": new_member.id,
                "username": new_member.username,
                "email": new_member.email
            }
        }, status=201)

        except Team.DoesNotExist:
            return JsonResponse({"error": "Team not found"}, status=404)
        
        except User.DoesNotExist:
            return JsonResponse({"error": "Email don't have an existing GridXPlan account"}, status=400)



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
            ig_accounts = Account.objects.filter(team__member__id=request.user.id).distinct()
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
        print("cells")
        print(cells)
        print(cells[0].image.url)
        print("--------------------")
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

#getting post details
def post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(post.serialize())
    else:
        return JsonResponse({
            "error": "GET request required."
        }, status=400)

@csrf_exempt
def update_post(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        users = post.cell.account.team.member.all()
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    if request.method == "PUT":
        user = User.objects.get(pk=request.user.id)
        
        if user in users:
            data = json.loads(request.body)
            post.caption = data.get("caption")
            post.hashtags = data.get("hashtags")
            post.schedule = data.get("schedule")
            post.status = data.get("status")

            post.save()
            return HttpResponse(status=204)

        else:
            return HttpResponse({"error": "You don't have permission to edit this post"}, status=403)        

    else:
        return JsonResponse({
            "error": "PUT request required."
        }, status=400)

@csrf_exempt
def add_image(request):
    try:
        data = json.loads(request.body)
        print("data")
        print(data)
        account = Account.objects.get(username=data.get('account'))
        users = account.team.member.all()
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    if request.method == "POST":
        user = User.objects.get(pk=request.user.id)
        
        if user in users:
            first_cell = account.account_grid.first()

            position = 1
            if first_cell:
                position += first_cell.position

            cell = Cell.objects.create(account=account, image=data.get('image'), position=position)

            return JsonResponse({
                "message": "Image successfully added", 
                "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
                "id": cell.id,
                "image": cell.image,
                "position": cell.position
            }, status=201)

        else:
            return HttpResponse({"error": "You don't have permission to edit this post"}, status=403)        


    else:
        return JsonResponse({
            "error": "POST request required."
        }, status=400)

@csrf_exempt
def comments(request, post_id):
    if request.method == "GET":
        post_comments = Comment.objects.filter(post__id=post_id)

        return JsonResponse([comment.serialize() for comment in post_comments], safe=False)
    
    if request.method == "POST":
        data = json.loads(request.body)
        post = Post.objects.get(pk=post_id)

        comment = Comment.objects.create(
            username = data.get("username"),
            comment = data.get("comment"),
            post = post
        )

        return JsonResponse({
                "message": "Comment successfully added", 
                "timestamp": datetime.now().strftime("%b %-d %Y, %-I:%M %p") , 
                "comment": comment.serialize()
            }, status=201)


    else:
        return JsonResponse({
            "error": "GET or POST request required."
        }, status=400)


