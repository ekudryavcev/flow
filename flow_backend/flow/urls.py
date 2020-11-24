from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("cards", views.CardViewSet, "cards")

urlpatterns = router.urls