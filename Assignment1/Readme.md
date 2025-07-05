# Job Portal API (Django - No DRF)

A basic backend for a Job Portal system built using core Django. This project allows companies to post job listings and applicants to apply — **without using Django REST Framework (DRF)**.

---

## Features

- Companies can be created
- Jobs can be posted by companies
- Applicants can apply to jobs
- Job listings and applicant lists can be viewed
- All data interactions via **JSON** using **function-based views (FBVs)**

---

## Tech Stack

- Python 3.x
- Django (Core, no DRF)
- SQLite (default Django DB)
- Function-Based Views only
- Manual JSON responses via `JsonResponse`

---

## Setup Instructions

1. **Move into Correct Directory**
   ```bash
   cd Assignment1/Job_Portal_Api

2. **Create Virtual Environment (optional but recommended)**
    ```bash
    python -m venv .job
    source .job/bin/activate  # On Windows: .job\Scripts\activate

3. **Install Dependencies**
    ```bash
    pip install django

4. **Run Migrations**
    ```bash
    python manage.py makemigrations
    python manage.py migrate

5. **Run Server**
    ```bash
    python manage.py runserver

---

## API Endpoints and Usage
1. **POST /api/create-company/**

Request:
```json
    {
    "name": "Google",
    "location": "Bangalore",
    "description": "Tech company"
    }
```
Response:
```json
{
  "message": "Company created successfully",
  "company_id": 1
}
```
2. **POST /api/post-job/**

Request:
```json
{
  "company_id": 1,
  "title": "Backend Developer",
  "description": "Experience with Django",
  "salary": 60000,
  "location": "Remote"
}
```
Response:
```json
{
  "message": "Job posted successfully",
  "job_id": 1
}
```
3. **GET /api/jobs/**

Response:
```json
[
  {
    "id": 1,
    "title": "Backend Developer",
    "description": "Experience with Django",
    "salary": 60000,
    "location": "Remote",
    "company_name": "Google"
  }
]
```
4. **POST /api/apply/**

Request:
```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "resume_link": "https://example.com/resume.pdf",
  "job_id": 1
}
```
Response:
```json
{
  "message": "Application submitted successfully",
  "applicant_id": 1
}
```
5. **GET /api/applicants/<job_id>/**

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@doe.com",
    "resume_link": "https://example.com/resume.pdf",
    "applied_at": "2025-07-05T08:30:00Z"
  }
]
```

---

Author<br>
Aditya Pandey | Full-stack Developer | Django | React | AI-ML Enthusiast