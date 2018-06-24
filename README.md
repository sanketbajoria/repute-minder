# Info
A quick start for an Angular 1.5.11 project running DS 3.2.0


# Getting Started

Download the Zip file of this repo to your computer. In a Terminal app, switch to the unzipped folder and  run `npm install` and then `bower install`.

Once the components have been installed, run the app locally any time by typing `gulp` in the terminal while in the app's root directory.

To build your app, use `gulp build` then `gulp serve-build` to run the app from the build folder. 

The build folder can also be uploaded to a server.


##Specs
* Angular           v. 1.5.11
* Design System     v. 3.2.1
* Angular Bootstrap v. 2.5.0
* Bootstrap         v. 3.3.7

##Includes
* Angular UI-Router routes
* Sample modules
* A mock service
* Index.html with all libraries and CSS files pre-linked
* Design System Header directive
* Design System Footer directive
* Design System Checkbox directive
* Design System Radio Button directive
* ngResource & ngAnimate
* Gulp task script file including tasks to:
  * Minify CSS & HTML
  * Uglify Javascript
  * Compile Sass
  * Use usemin to minimze JS files into vendor and development files



##Doesn't support
* Node server calls
