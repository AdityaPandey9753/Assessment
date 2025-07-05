from django.urls import path
from . import views

urlpatterns = [
    path("api/register/", views.register_view),
    path("api/login/", views.login_view),
    path("api/create-post/", views.create_post_view),
    path("api/posts/", views.get_all_posts_view),
    path("api/post/<int:id>/", views.get_single_post_view),
    path("api/post/<int:id>/comment/", views.add_comment_view),
    path("api/post/<int:id>/edit/", views.edit_post_view),
    path("api/post/<int:id>/delete/", views.delete_post_view),
    path("api/comment/<int:id>/edit/", views.edit_comment_view),
    path("api/comment/<int:id>/delete/", views.delete_comment_view),
    path("api/post/<int:id>/like/", views.like_post_view),
    path('api/logout/', views.logout_view),

]
