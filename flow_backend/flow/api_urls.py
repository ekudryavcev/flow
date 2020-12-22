from . import views
from rest_framework.routers import SimpleRouter
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

router = SimpleRouter()
router.register("cards", views.CardViewSet, "cards")
router.register("columns", views.ColumnViewSet, "columns")
router.register("boards", views.BoardViewSet, "boards")
#router.register("users", views.UserViewSet, "users")
router.register("tags", views.TagViewSet, "tags")

urlpatterns = router.urls + [
    path("token-auth/", obtain_jwt_token),
    path("current_user/", views.current_user),
    path("users/", views.UserList.as_view())
]