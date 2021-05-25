
from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from . import views, api

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('planner/', login_required(TemplateView.as_view(template_name='index.html')), name="planner"),
    path('planner/preview/<path:path>', TemplateView.as_view(template_name='index.html'), name="planner"),
    path('planner/<path:path>', login_required(TemplateView.as_view(template_name='index.html')), name="planner"),

    #API
    path("api/grid/<str:account>", api.grid, name="grid"),
    path("api/post/<int:post_id>", api.post, name="post"),
    path("api/post/edit/<int:post_id>", api.update_post, name="edit_post"),
    path("api/comments/<int:post_id>", api.comments, name="comments"),
    path("api/post/add", api.add_image, name="add_image"),
    path("api/accounts", api.accounts, name="accounts"),
    path("api/team/<str:account>", api.team, name="team"),
]
