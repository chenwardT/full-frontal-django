# Full Frontal Django :ok_woman:

A demonstration project integrating Django, Gulp, Browsersync, Webpack (with HMR) and Babel, 
with support for React/JSX.

## Install

_We are using virtualenvwrapper - if you'd rather not use virtualenvwrapper, you must adapt the syntax
used to activate your virtualenv accordingly in the gulpfile; see the `django-server` task._

Create a virtualenv:

```
mkvirtualenv ffd-dev
```

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

Run the default gulp task:

```
gulp
```

This starts a webpack-dev-server, the Django server, and sets up Browsersync to reload content
when changes are detected in CSS and HTML directories. See the gulpfile for exact paths.

You should now see changes to your sources reflected in your browser! :tada:
 
 _Note:_ The webpack dev server is configured to listen on the interface specified by `INTERFACE` in 
 webpack.config.js. This is set to localhost by default.
 
## Description

Webpack is kept decoupled from Django's _staticfiles_ system via the following:

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
in the browser w/o requiring a page reload (__so long as your changes are not in the entry point__).
