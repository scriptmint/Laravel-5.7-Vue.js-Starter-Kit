[Click here to visit demo of Laravel 5.7 Vue.js Starter Kit](https://laravue.scriptmint.com)

# Laravel Vue.js SPA Bootstrap Admin Starter Kit

* [Online Demo](#demo)
* [Introduction](#introduction)
* [Pre Requisites](#pre-requisites)
* [Folder & File Structure](#structure)
* [Installation Guideline](#installation)
* [Social Login Configuration](#social-login)
* [Compiling Assets](#compiling)

## Online Demo

[Click here to visit demo of Laravel Vue.js Starter Kit](https://laravue-basic.scriptmint.com)

To get more advance feature in Starter Kit, [you may visit www.scriptmint.com & purchase Advanced Laravel Vue.js Starter Kit](https://scriptmint.com/product/laravel-vue-js-spa-bootstrap-admin-starter-kit/03031506)

## Introduction

There are many Laravel+Vue.js starter kit available but none of them are complete enough to get started. Some lacks with basic functionality like authentication, some with sample CRUD module, some with responsive layout etc. I tried to create one starter kit with some basic features like authentication, registration, user profile with a sample task module which is built on latest version of bootstrap.This script can be handy enough for your new Laravel+Vue.js project & will surely speed-up your project development time. If you are working first time on Laravel+Vue.js or learning Vue.js then this is perfect script to get started.

### This script is built with following:

* Laravel 5.5
* Vue.js 2.4.2
* Bootstrap 4.0.0 beta
* jQuery 3.2.0
* Aixos 0.16.2

### Here are the composer packages used in this script:

* intervention/image
* tymon/jwt-auth
* laravel/socialite

### Here are the npm packages used in this script:

* laravel-mix
* vue-router
* vuex
* browser-sync
* click-confirm
* js-cookie
* laravel-vue-pagination
* normalize-scss
* vue-range-slider
* vuejs-datepicker
* vuex-persistedstate

### Here are the list of features this script offers to the buyers:

* Responsive layout, desktop/laptop/tablet/mobile compatible
* Laravel REST api
* Single Page application (SPA)
* JSON Authentication
* Social oAuth
* User Registration
* User Activation
* Reset Password
* Password Change Email
* Change Password
* User Profile
* User Profile Picture
* Dashboard
* Blank Page
* Error Page
* Sample Task with CRUD (Create/Read/Update/Delete)
* Sample Todo App
* Sample App Configuration

Author assumes that you have basic knowledge of Laravel & Javascript to start development with this script. If you have no experience with Javascript, then you can take a look at this tutorial.

For any kind of support, you can raise a ticket in this portal.

### I am looking forward for your suggestions & feedback for this script & I will surely implement your feature request if feasible. Don't forget to star this repo if you find it useful.

## Pre Requisites

Read this article carefully before installing this application. If you miss this article, you might not get the application working.

You must have composer installed in your system. If you don't have knowledge about composer, [please click here](https://scotch.io/tutorials/a-beginners-guide-to-composer). Once you have installed the composer in your computer, you need to install Node.js in your system. Here is a good article to install node.js in your computer. You need to install npm globally in your system.

As the application is built with Laravel 5.5, it requires to follow all the pre-requisites of Laravel 5.5. [Click here to visit installation guidelines of Laravel](https://docs.scriptmint.com).

* PHP >= 7.0.0
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
* XML PHP Extension

[You may read detailed article to install Laravel based application here](https://docs.scriptmint.com).

## Folder & File Structure

The script follows conventional Laravel+Vue.js folder structure. The folders & files are grouped and placed in desired location. Here is the folder structure of Laravel application.

![Laravel File Structure](https://scriptmint.com/upload/59cfd4f713738.jpg)

All the folders except "node_modules" are part of Laravel application. In order to install npm dependency, you get a folder called "node_modules" in your script.

I believe you already have knowledge of Laravel therefore I am not providing details of its folder structure. If you want to know more about it you can click here.

Here is the detailed folder structure of resource folder where all the Vue components, assets (Images, Javascript, Stylesheets & Plugins are place).

![Detail File Structure](https://scriptmint.com/upload/59cfd517e6b18.jpg)

The script use only single Laravel blade file which is placed under resources/views/home.blade.php, which actually imports a layout called master.blade.php which is place at resources/views/layouts folder. This file is responsible for generating basic layout of the script. It includes bundled stylesheets in the head tag & bundled js files just above the body tags. To make less request to the server, all the stylesheets & js files are bundled into single file.

### Here are details of all the folders available in resources/assets folder.

#### Images:

This includes all the images that are referred in any style sheet or js file. Make sure you put those images in this folder only. During compilation, you will get all these files processed at public/images folder.

#### Js:

This folder is basically the most important container for this script. As all the Vue components are basically Javascript file therefore they are placed under this folder. This includes three sub folders:

* layouts: It is basically layout structure of this script. It includes vue files divided into multiple segment like header.vue, footer.vue etc. The file guest-page.vue renders guest page (like login page which can be accessed without login). The file default-page.vue renders application page (which will be accessible only after login) & error-page.vue which renders error page layout.
* services: These are basically helper javascript files.
* views: These are pages which will be rendered when you navigate to a certain page. For example, If you navigate to {{your_domain}}/login, the file resources/assets/js/views/authentication/login.vue is rendered. All the files are grouped by modules.

### Here are details of file available in resources/assets/js

* app.js: This is entry point of all the Javascript files. It is also a place where you define new Vue app.
* bootstrap.js: It is default Javascript file provide by Laravel where you can import various dependencies including Axios, Vue-Router, Vuex etc.
* custom.js: It is basically jQuery scripts written for layout design.
* routes.js: It is used to define the Vue router path and the component it will render for the page. It is like routes.php or web.php file in Laravel. [For details visit here](https://router.vuejs.org/).
* store.js: It is used to define Vuex store. [For details visit here](http://vuex.vuejs.org/).

#### Plugins:

This folder contains all the external plugins which you want to use in this script. For example, this script uses jQuery plugin which is place under this folder. Similarly, Bootstrap files are placed in this folder. If you are going to use any other plugin, I strongly suggest you to put under this folder. You can import the style sheet of that plugin into resources/Assets/saas/style.scss & combine the js of that plugin in webpack.mix.js file.

#### Style sheet:

Head tag includes single style sheet called style.css which includes all the style sheets including bootstrap, plugin style sheet and custom style sheet. Basically resources/assets/sass/style.scss is entry point of all the style sheets which imports all other style sheets.A custom.scss file is also available in resources/assets/sass folder where you can put all your custom css code. Mind the order of import of css in resources/assets/sass/style.scss file. If you import custom.scss file before other scss file, then your custom css code will be overridden by other css code.

When you deploy your application in live server, you need not to upload contents of "node_modules" folder & "resources/assets" folder. During compilation all the required files are bundled and placed at public folder.

If you have an query regarding this folder structure, you may raise an issue here.

## Installation Guideline

After making sure that your system has all the pre-requisites, you are ready to install the application. Once you download file or clone this repo, you will get a compressed file in your computer. After extracting the compressed file, below is the file structure of the script.

![File Structure](https://scriptmint.com/upload/59cfd4209a1b3.png)

You might not get two folders marked in red. To get these folders in your script follow these steps:
Open command prompt or terminal and navigate to the folder where you have extracted this script.
Type below command to first get "vendor" folder.

``` bash
composer update
```

This may take some time depending upon your internet speed and your system configuration. Do not interrupt while the the process is running. Once completed, you will get "vendor" folder as shown in the above screenshot.
Important: As per Laravel 5.5 document - "Any fire methods present on your Artisan commands should be renamed to handle". You need to go to rename file method present in "vendor\tymon\jwt-auth\src\Commands\JWTGenerateCommand.php".
Next, to get "node_modules" folder, you need to run below command.

``` bash
npm install
```

This will again take some time depending upon your internet speed and your system configuration. Once completed, you will get "node_modules" folder as shown in the above screenshot. Please note that you need to have installed npm globally before running this command.
Next, you need to run below command in order to get a secret App Key for your script.

``` bash
php artisan key:generate
```

Open .env file as shown in the above screenshot in any text editor (Say Notepad++ or Atom or Sublime Editor) and enter required details. You must have done this step previously if you have deployed Laravel application.
After setting database details and other global variables in .env file, you need to create database structure in your system. Make sure you enter correct database details. For this, you need to run below command.

``` bash
php artisan migrate
```

This command will create tables in your database. In the last step, you need to run below command.

``` bash
npm run dev
```

This will compile all the assets into public folder and now you are ready to run the application.
Go to your browser, and navigate to application URL as mentioned in APP_URL. You will get login page of this script.

If you are running "npm run watch" with browser-sync then make sure you have entered your application URL in the place of "laravue" in webpack.mix.js file.

If you miss any of these step, you might not get the login page. For any issue, please raise a ticket in this portal.

## Social Login Configuration

There is also a feature to login via Social oAuth. This script provides you fully automated script to start with this Social oAuth. There are three built in Social oAuth & anytime, if you want to have more Social Networking sites you can easily do it within few minutes.

To get started with it, you need to have a working app in different Social Networking sites say facebook.com/twitter.com/github.com etc. Once you create your app, you will get a unique App Id, App Secret & Redirect URL where your application will be redirected after successful authorization from different platform.

Now, you need to open .env file available in the root folder and enter these details as below:

![Social Login Configuration](https://scriptmint.com/upload/59cfd5f14795f.png)

Make sure you follow the URL format same as give above. For example if you want to add google oAuth then the URL will be "<your_domain>/auth/google/callback".

Once you put correct details here, you can now open resources/assets/js/views/auth/login.vue file & provide a link like below:

![Social Login View Configuration](https://scriptmint.com/upload/59cfd5f8eb61b.jpg)

Make sure you follow the URL format same as give above. For example if you want to add google oAuth then the URL will be "/auth/social/google".

For any issue, please raise a ticket in this portal.

## Compiling Assets

You might be familiar with npm run command which performs a series of tasks define in package.json file. Package.json file is available in the root of the script.

If you go to package.json file, you will get some pre-defined scripts as below:

* npm run dev: This command is short-form for npm run development, which compiles the assets in unminified version.
* npm run development: This performs same operation as npm run dev.
* npm run watch: This command compiles the assets and watch for the changes.
* npm run hot: This command compiles the assets and watch the files with instant reload.
* npm run prod: This command is short-form for npm run production, which compiles the assets in minified version.
* npm run production: This performs same operation as npm run prod.

You can also define dependencies and developer dependencies for your project in this package.json file. For example, Vuex library is used in this script, therefore it is added in devDependency. You can add any dependency and install it via npm install command.


