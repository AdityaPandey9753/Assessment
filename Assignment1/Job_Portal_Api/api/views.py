import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Company, JobPost, Applicant
from django.utils.dateformat import format


# Create your views here.
@csrf_exempt
def create_company(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            name = data.get("name")
            location = data.get("location")
            description = data.get("description")

            if not all([name, description, location]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            company = Company.objects.create(
                name=name,
                location=location,
                description=description,
            )

            return JsonResponse(
                {"message": "company created", "company id": company.id}, status=200
            )
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid json format"}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def post_job(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            company_id = data.get("company_id")
            title = data.get("title")
            description = data.get("description")
            salary = data.get("salary")
            location = data.get("location")

            if not all([company_id, title, description, salary, location]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            try:
                company = Company.objects.get(id=company_id)
            except Company.DoesNotExist:
                return JsonResponse({"error": "Company not found"}, status=404)

            # Create job post
            job = JobPost.objects.create(
                company=company,
                title=title,
                description=description,
                salary=salary,
                location=location,
            )

            return JsonResponse(
                {"message": "Job posted successfully", "job_id": job.id}, status=201
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def list_jobs(request):
    if request.method == "GET":
        jobs = JobPost.objects.select_related("company").all()
        if not jobs.exists():
            return JsonResponse({"message": "No job postings found"}, status=200)

        job_list = []
        for job in jobs:
            job_list.append(
                {
                    "id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "salary": job.salary,
                    "location": job.location,
                    "company_name": job.company.name,
                }
            )

        return JsonResponse(job_list, safe=False)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def apply_for_job(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            name = data.get("name")
            email = data.get("email")
            resume_link = data.get("resume_link")
            job_id = data.get("job_id")

            if not all([name, email, resume_link, job_id]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            try:
                job = JobPost.objects.get(id=job_id)
            except JobPost.DoesNotExist:
                return JsonResponse({"error": "Job not found"}, status=404)

            if Applicant.objects.filter(email=email, job=job).exists():
                return JsonResponse(
                    {"error": "You have already applied for this job"}, status=400
                )

            applicant = Applicant.objects.create(
                name=name, email=email, resume_link=resume_link, job=job
            )

            return JsonResponse(
                {
                    "message": "Application submitted successfully",
                    "applicant_id": applicant.id,
                },
                status=201,
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def get_applicants_for_job(request, job_id):
    if request.method == 'GET':
        try:
            job = JobPost.objects.get(id=job_id)
        except JobPost.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)

        applicants = Applicant.objects.filter(job=job)

        applicant_list = []
        for applicant in applicants:
            applicant_list.append({
                'id': applicant.id,
                'name': applicant.name,
                'email': applicant.email,
                'resume_link': applicant.resume_link,
                'applied_at': applicant.applied_at.isoformat()
            })

        return JsonResponse(applicant_list, safe=False)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)