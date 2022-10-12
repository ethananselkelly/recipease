RECIPEASE
=========
Simple full-stack web app for scraping and saving recipes from all over the internet.

Skips the blog posts and goes straight to the important stuff.

https://recipease1.herokuapp.com/

Running the App locally
=========

This is a web app but can be run locally on your machine.

Recipease was created using Node 14.15. Please make sure you have the proper packages installed using yarn install

The database is designed to work with PostgresSQL.

> $ createdb recipease_development

Run the following commands in your server folder to create the database:

> $ yarn migrate:latest

To run the website, make sure you are in your root file and run:

>$ source server/venv/bin/activate

> $ yarn run dev

Then navigate to:

> https://localhost:3000


Thanks to https://github.com/hhursev/recipe-scrapers for the robust Python recipe scraper.

Thanks to https://github.com/Submersible/node-python-bridge for the tool to run the scraper in this JS repo.

And thanks to https://github.com/LaunchAcademy/generator-engage for the scaffolding of this app.
