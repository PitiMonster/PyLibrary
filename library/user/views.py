from django.shortcuts import render
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Email must be provided!")
        if not username:
            raise ValueError("Username must be provided!")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )

        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email               = models.EmailField(verbose_name='email', max_length=40, unique=True)
    username            = models.CharField(verbose_name='username', max_length=25, unique=True)
    date_joined         = models.DateField(verbose_name='date joined', auto_now_add=True)
    last_login          = models.DateField(verbose_name='last login', auto_now_add=True)
    is_activ            = models.BooleanField(default=True)
    is_admin            = models.BooleanField(default=False)
    is_staff            = models.BooleanField(default=False)
    is_superuser        = models.BooleanField(default=False)

    USERNAME_FIELD = 'email' # login field
    REQUIRED_FIELDS = ['username',]

    objects=UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True