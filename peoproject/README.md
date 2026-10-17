# Moses Kipsang Portfolio

Django portfolio site with a responsive Ubuntu inspired interface.

## Run locally

1. Create and activate a virtual environment.
2. Install dependencies with `pip install -r requirements.txt`.
3. Copy `.env.example` to `.env` and set a private `SECRET_KEY`.
4. Start Django with `python manage.py runserver`.

## Deploy from GitHub to Vercel

The GitHub repository contains the Django project in the `peoproject/` subdirectory. Import the GitHub repository as a new Vercel project and set the Root Directory to `peoproject` (the folder containing `manage.py`, `requirements.txt`, and `.python-version`). Vercel detects Django from `manage.py`; leave the Framework Preset, Build Command, and Output Directory on their detected/default values. No `vercel.json` routing file or `/api` wrapper is needed.

Before the first deployment, add these **Production** environment variables in Vercel Project Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `SECRET_KEY` | A fresh, private Django secret. Generate one with `python -c "import secrets; print(secrets.token_urlsafe(50))"`. |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | Optional comma separated custom domains, without `https://`. Vercel deployment domains ending in `.vercel.app` are allowed automatically. |
| `CSRF_TRUSTED_ORIGINS` | Optional comma separated full origins for custom domains, including `https://` (for example, `https://portfolio.example.com`). The active Vercel deployment URL is added automatically. |

Do not use the local `.env` secret in production and do not commit `.env` files. Add the same variables to Preview or Development environments only if you plan to deploy those environments.

Static assets are collected from `static/` into `staticfiles/` during Vercel's Django build and served by its CDN. The portfolio currently uses SQLite only as a local default; Vercel's function filesystem is temporary, so do not use it to store production data. This portfolio does not need a database for its public pages.

## Before connecting GitHub

- Push the project files, including `requirements.txt`, `.python-version`, and this README, to GitHub.
- Confirm `.env` and `db.sqlite3` are not tracked.
- Import the repository in Vercel and add the production environment variables above before the first build.
