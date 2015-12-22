# Full Frontal Django

A demonstration project integrating Django, Webpack (with HMR) and Babel, with support for React/JSX.

## Install

Install Python packages:

```
pip install -r requirements.txt
```

Install JS packages:

```
npm install
```

The example app uses models that are backed by postgres. Create `secrets.py` in project root 
and define the following:

* `DJANGO_SECRET_KEY`

* `POSTGRES_USER`

* `POSTGRES_PASSWORD`

If you are not using postgres (or any database that requires authentication), you may omit or replace
the relevant definitions. See `settings.py` for uses.

## Usage

The `django-extensions` package is used, so start the Django dev server with:
 
 ```
 python manage.py runserver_plus
 ```
 
 Start the webpack dev server with:
 
 ```
 node server.js
 ```
 
 _Note: The webpack dev server is configured to listen on the interface specified by `INTERFACE` in 
 webpack.config.js._
 
## Description

Webpack is kept decoupled from Django's staticfiles system via the following:

* `webpack-bundle-tracker` extracts information from webpack

* `django-webpack-loader` uses the extracted info for Django integration
    * Informs Django which bundle to include in our templates
    * Raises exceptions when webpack fails to build a bundle
    * Displays useful info for debugging
    * Blocks requests when a bundle is being generated (only the latest bundle will be loaded)
    
See `settings.py` and any reactive template for examples of how to reference the webpack bundle.

NPM manages the front end dependencies which are described by `package.json`.

The webpack dev server will watch for changes to JS sources, re-compile the bundle, __serve it 
from memory__ (you will not see a bundle file updating in assets/bundles!), and display changes
in the browser w/o requiring a page reload (so long as your changes are not in the entry point).

`server.js` uses the webpack-dev-server API to create an instance of the server and relevant settings
to it from `webpack.config.js`.