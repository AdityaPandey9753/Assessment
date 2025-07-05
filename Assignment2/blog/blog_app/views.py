from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from .models import Post, Comment
import json


@csrf_exempt
@require_http_methods(["POST"])
def register_view(request):
    try:
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        return JsonResponse({"message": "User registered successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def create_post_view(request):
    try:
        data = json.loads(request.body)
        title = data.get("title")
        content = data.get("content")

        post = Post.objects.create(author=request.user, title=title, content=content)
        return JsonResponse({"message": "Post created", "post_id": post.id})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@require_http_methods(["GET"])
@require_http_methods(["GET"])
def get_all_posts_view(request):
    try:
        page = int(request.GET.get("page", 1))
        limit = int(request.GET.get("limit", 5))
        offset = (page - 1) * limit
        posts = Post.objects.all().order_by("-created_at")
        total_posts = posts.count()
        posts = posts[offset : offset + limit]

        data = [
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "author": post.author.username,
                "created_at": post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for post in posts
        ]
        return JsonResponse(
            {"page": page, "limit": limit, "total": total_posts, "posts": data}
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@require_http_methods(["GET"])
def get_single_post_view(request, id):
    post = get_object_or_404(Post, id=id)
    comments = Comment.objects.filter(post=post).order_by("created_at")
    comment_data = [
        {
            "id": c.id,
            "user": c.user.username,
            "text": c.text,
            "created_at": c.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for c in comments
    ]
    post_data = {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "author": post.author.username,
        "created_at": post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "comments": comment_data,
    }
    return JsonResponse(post_data)


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def add_comment_view(request, id):
    try:
        post = get_object_or_404(Post, id=id)
        data = json.loads(request.body)
        text = data.get("text")

        comment = Comment.objects.create(post=post, user=request.user, text=text)
        return JsonResponse(
            {
                "message": "Comment added",
                "comment": {
                    "id": comment.id,
                    "text": comment.text,
                    "user": comment.user.username,
                },
            }
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@login_required
@require_http_methods(["PUT"])
def edit_post_view(request, id):
    try:
        post = get_object_or_404(Post, id=id)
        if post.author != request.user:
            return JsonResponse({"error": "Permission denied"}, status=403)

        data = json.loads(request.body)
        post.title = data.get("title", post.title)
        post.content = data.get("content", post.content)
        post.save()

        return JsonResponse({"message": "Post updated"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@login_required
@require_http_methods(["DELETE"])
def delete_post_view(request, id):
    post = get_object_or_404(Post, id=id)
    if post.author != request.user:
        return JsonResponse({"error": "Permission denied"}, status=403)

    post.delete()
    return JsonResponse({"message": "Post deleted"})


@csrf_exempt
@login_required
@require_http_methods(["PUT"])
def edit_comment_view(request, id):
    try:
        comment = get_object_or_404(Comment, id=id)
        if comment.user != request.user:
            return JsonResponse({"error": "Permission denied"}, status=403)

        data = json.loads(request.body)
        comment.text = data.get("text", comment.text)
        comment.save()

        return JsonResponse({"message": "Comment updated"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@login_required
@require_http_methods(["DELETE"])
def delete_comment_view(request, id):
    comment = get_object_or_404(Comment, id=id)
    if comment.user != request.user:
        return JsonResponse({"error": "Permission denied"}, status=403)

    comment.delete()
    return JsonResponse({"message": "Comment deleted"})

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def like_post_view(request, id):
    post = get_object_or_404(Post, id=id)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
        return JsonResponse({"message": "Post unliked"})
    else:
        post.likes.add(request.user)
        return JsonResponse({"message": "Post liked"})

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})