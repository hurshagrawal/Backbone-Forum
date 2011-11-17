Sample Backbone.js-based Forum App
==================================

For learning and exploring the capabilities of Backbone.js + Rails. Written in Coffeescript.

All backbone.js coffeescript files are in app/coffeescripts.
All EJS backbone.js templates are in app/templates.

This project uses JAMMIT to compile templates and JS via pre-commit hooks. To install JAMMIT and get it working, type the following into the console from the project root:

>gem install jammit
>mv ./pre-commit ./.git/hooks/pre-commit
>chmod u+x .git/hooks/pre-commit
