from django.views.generic import ListView, DetailView
from django.shortcuts import render
from .models import User, Distance


# Create your views here.
def home_view(request,*args,**lwargs):
    users = User.objects.all()
    distance = Distance.objects.all()
    pageTitle = 'Recommender System'
    context = {
        'pageTitle': pageTitle,
        'objects': users,
        'distance': distance,
    }
    return render(request,'index.html',context)

class UserListView(ListView):
    model = User
    context_object_name = 'objects'
    template_name = "list.html"
    extra_context={
        'pageTitle' : 'Users',
    }

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['distances'] = Distance.objects.all().order_by('distance')[:50]
        context['hightdistances'] = Distance.objects.all().order_by('-distance')[:50]
        return context

class UserDetailView(DetailView):
    model = User
    context_object_name = "object"
    template_name = "user.html"
    pk_url_kwarg = "user_id"
    extra_context={
        'pageTitle' : 'User',
    }

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        distances = Distance.objects.filter(first=self.kwargs['user_id']) | Distance.objects.filter(second=self.kwargs['user_id'])
        context['distances'] = distances.order_by('distance')
        return context