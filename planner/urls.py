
from django.urls import path
from django.views.generic import TemplateView

from . import views, api

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('planner/', TemplateView.as_view(template_name='index.html'), name="planner"),

    #API
    path("api/grid/<str:account>", api.grid, name="grid"),
    path("api/post/<int:post_id>", api.post, name="post")
]
