# Blog + Comment System API (Core Django, No DRF)

A simple blog and comment system API with user authentication using **core Django only** — no Django REST Framework. This project supports user registration, login, post creation, comments, likes, and secure editing/deleting.

---

## Features

- User registration and login using Django's built-in auth system
- Session-based authentication
- Create, read, edit, and delete blog posts
- Add and manage comments on posts
- Like/unlike blog posts
- Paginated posts listing
- Proper permission checks on all protected actions

---

## Setup Instructions

1. **Move into Correct Directory**
   ```bash
   cd Assignment2/blog

2. **Create a virtual environment**
  ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
  ```
3. **Install dependencies**
  ```bash
   pip install django
```
4. **Run migrations**
  ```bash
   python manage.py makemigrations
   python manage.py migrate
  ```

5. **Run the development server**
  ```bash
   python manage.py runserver
```

## Test using Postman or curl
### Authentication
<br>**Register**<br>
POST /api/register/
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456"
}
```
**Login**<br>
POST /api/login/
```json
{
  "username": "johndoe",
  "password": "123456"
}
```
**Logout**<br>
POST /api/logout/

### Posts
**Create Post**<br>
POST /api/create-post/ (Authenticated)
```json
{
  "title": "My First Post",
  "content": "This is a test post."
}
```
**Get All Posts (Paginated)**<br>
GET /api/posts/?page=1&limit=5

**Get Single Post with Comments**<br>
GET /api/post/<id>/

**Edit Post**<br>
PUT /api/post/<id>/edit/ (Owner only)
```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

**Delete Post**<br>
DELETE /api/post/<id>/delete/ (Owner only)

### Comments
**Add comments Post**<br>
POST /api/post/<id>/comment/ (Authenticated)
```json
{
  "text": "Great post!"
}
```
**Edit Comment**<br>
PUT /api/comment/<id>/edit/ (Owner only)
```json
{
  "text": "Updated comment text"
}
```
**Delete Comment**<br>
DELETE /api/comment/<id>/delete/ (Owner only)

### Likes
**Like or Unlike a Post**<br>
POST /api/post/<id>/like/ (Authenticated)<br>
Toggles the like state (like if not liked, unlike if already liked)

### Authentication Notes
- Session-based authentication is used (login() and logout())
- Use Postman’s "Cookie Jar" to persist login between requests
- CSRF checks are disabled for API endpoints using @csrf_exempt (for easier API testing)

---

Author<br>
Aditya Pandey | Full-stack Developer | Django | React | AI-ML Enthusiast