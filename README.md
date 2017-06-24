# static-template

Here's my web static template, working with Gulp 3.9.

#### When to use it ?
You should use it for a simple HTML website, or as a template for a PHP website. For example, you can drag & drop my [rooting](https://github.com/gabrielstik/rooting) project into the `/dist` directory to have a working dynamic template.

## Features

#### Scripts
* Minifies & concat scripts
* Converts ES6 to ES5

#### Styles
* Minifies & concat styles
* Converts SASS/SCSS to CSS
* Minifies styles libraries

#### Libraries
* Font-Awesome 4.7.0
* Custom reset.css

& more features coming soon!

## Get started

You need [Node.js](https://nodejs.org/en/) to use this template.
Clone that repo then go to the builder directory and install the node_modules using :
```
npm install
```
Then run it using :
```
gulp
```

## Usage

Your website folder is `/dist`.

In assets you will find your minified and concatened styles and scripts. Don't edit them in that directory!
Scripts & styles have to be edited in `/src` which is the directory where Gulp watches: they will be edited and copied to `/dist/assets`.

As a result you have a complete & beautified website in `/dist` so the only thing you have to do is open your index in your browser.

:warning: Make sure that Gulp is running when you edit your website.

#### Server
If you want to push your website to a server, put the content of the `/dist` directory into your distant web directory.

***

Thank you ! :thumbsup:
