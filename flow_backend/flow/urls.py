from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework.routers import SimpleRouter
from django.urls import path

router = SimpleRouter()

urlpatterns = router.urls + [
    path("board", views.board),
    path("login", views.login),
    path("^login/$", views.LoginAPI.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)