from pathlib import Path

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'portfolio.html')


def robots_txt(request):
    content = '\n'.join((
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin/',
        'Sitemap: https://moseskipsang.vercel.app/sitemap.xml',
        '',
    ))
    return HttpResponse(content, content_type='text/plain; charset=utf-8')


def sitemap_xml(request):
    content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://moseskipsang.vercel.app/</loc>
  </url>
</urlset>
'''
    return HttpResponse(content, content_type='application/xml; charset=utf-8')


def service_worker(request):
    worker = Path(settings.BASE_DIR) / 'static' / 'portfolio' / 'service-worker.js'
    response = HttpResponse(worker.read_text(encoding='utf-8'), content_type='application/javascript')
    response['Service-Worker-Allowed'] = '/'
    response['Cache-Control'] = 'no-cache'
    return response
