from django.urls import path
from .views import (
    create_company,
    post_job,
    list_jobs,
    apply_for_job,
    get_applicants_for_job,
)

urlpatterns = [
    path("api/create-company", create_company, name="create-company"),
    path("api/post-job/", post_job, name="post-job"),
    path("api/jobs/", list_jobs, name="list-jobs"),
    path("api/apply/", apply_for_job, name="apply-jobs"),
    path("api/applicants/<int:job_id>/", get_applicants_for_job, name="get-applicants"),
]
