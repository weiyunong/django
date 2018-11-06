import hashlib
import random
import time
import uuid
import json

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
# 首页
# from app.models import User
from app.models import User, Wheel


def index(request):
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)
    wheels = Wheel.objects.all()

    if users.exists():
        user = users.first()
        return render(request, 'index.html',context={'username': user.username,'wheels': Wheel.img})
    else:
        return render(request, 'index.html')



def generate_token():
    token = str(time.time()) + str(random.random())
    # MD5
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))
    return md5.hexdigest()

# 登录
def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('txtLoginID')
        # 验证
        password = request.POST.get('txtLoginPwd')

        users = User.objects.filter(username=username, password=password)
        if users.exists():

            user = users.first()
            user.token = generate_token()
            user.save()
            response = redirect('apps:indexs')
            response.set_cookie('token', user.token)

            return response
        else:
            return HttpResponse('用户名或密码错误')

# 注册
def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST.get('txtRegisterID2')
        password = request.POST.get('txtRegisterID3')
        try:
            user = User()
            user.username = username
            user.password = password
            user.token = uuid.uuid5(uuid.uuid4(), 'register')

            user.save()
            response = redirect('apps:indexs')
            response.set_cookie('token', user.token)
            return response
        except Exception as e:
            return HttpResponse('注册失败' + e)
# 购物车
def cart(request):
    return render(request,'shopping_cart.html')


