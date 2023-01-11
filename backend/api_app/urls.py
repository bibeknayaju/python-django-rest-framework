from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api_app.views import PatientViewSet

router = routers.DefaultRouter()
router.register(r'patient', PatientViewSet)

urlpatterns = [
    path('', include(router.urls))
]
