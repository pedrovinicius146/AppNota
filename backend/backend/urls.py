from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import RegistroViewSet

router = DefaultRouter()
router.register(r'registros', RegistroViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
