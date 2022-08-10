RECIPEASE
=========
Simple full-stack web app for scraping and saving recipes from all over the internet.

Skips the blog posts and goes straight to the important stuff

Uses the https://github.com/jadkins89/Recipe-Scraper scraper package

Running the App
=========

Recipease was created using Node 14.15. Please make sure you have the proper packages installed using yarn install

The database is designed to work with PostgresSQL.

> $ createdb recipease_development

Run the following commands in your server folder to create the database:

> $ yarn migrate:latest

To run the website, make sure you are in your root file and run:

> $ yarn run dev

Then navigate to:

> https://localhost:3000
