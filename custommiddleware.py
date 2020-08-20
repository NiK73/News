from django.contrib import messages
from django.http import HttpResponseRedirect

class ImageField404Middleware:
     def __init__(self, get_response):
         self.get_response = get_response

     def __call__(self, request):
         response = self.get_response(request)

         if (request.method == 'GET' and response.status_code == 404):
             post_messages = messages.get_messages(request)
             for message in post_messages:
                 if ('was added successfully' in message.message or 'was changed successfully' in message.message
                         and message.level != 'SUCCESS'):
                     messages.success(request, message.message)
                     redirect_url = 'https://egi.code-e-python.com/admin/feeds/news/'
                     if '_addanother' in request.POST:
                         redirect_url = re.sub(r'[^/]*/[^/]*/$', 'add/', redirect_url)
                     elif '_save' in request.POST:
                         redirect_url = re.sub(r'[^/]*/[^/]*/$', '', redirect_url)
                     return HttpResponseRedirect(redirect_url)

         return response