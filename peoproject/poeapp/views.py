from pathlib import Path

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'portfolio.html')


def service_worker(request):
    worker = Path(settings.BASE_DIR) / 'static' / 'portfolio' / 'service-worker.js'
    response = HttpResponse(worker.read_text(encoding='utf-8'), content_type='application/javascript')
    response['Service-Worker-Allowed'] = '/'
    response['Cache-Control'] = 'no-cache'
    return response
