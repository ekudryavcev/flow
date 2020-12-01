from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("cards", views.CardViewSet, "cards")
router.register("columns", views.ColumnViewSet, "columns")
router.register("boards", views.BoardViewSet, "boards")
router.register("users", views.UserViewSet, "users")
router.register("tags", views.TagViewSet, "tags")

urlpatterns = router.urls