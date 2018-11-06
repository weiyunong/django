from django.conf.urls import url
from app import views
urlpatterns = [
    url(r'^$',views.index,name='indexs'),   # 首页
    url(r'^login/$',views.login,name='logins'),   # 登录
    url(r'^register/$',views.register,name='registers'),  # 注册
    url(r'^cart/$',views.cart,name='carts'),  # 购物车
]