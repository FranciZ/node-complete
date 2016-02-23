# AngularJS & NodeJS

## Prerequisites

* installed NodeJS (nodejs.org)
* installed MongoDB (mongodb.org)
* running *mongod* in the background
* bower, grunt and yo installed

```javascript
npm install -g grunt-cli yo bower
```
```javascript
npm install -g generator-cg-angular
```

## 

#### API component overview:

* MongoDB / mongoose
* ExpressJS server for routing
* Bcrypt for encryption of passwords
* Multipart for uploading
* Graphicmagic for converting images

#### Angular CMS component overview:

* UI Router
* AdminLTE
* TinyMCE
* ng-file-upload

#### Web site component overview:

* EJS template rendering

## AngularJS workflow

CMS application is divided into three main views (UI Router ui-view). Sidebar, main and main-header. The core navigation is driven through states which are defined **app.js**

### 1. State setup

We can generate a new state by running:

```
$ yo cg-angular:partial {state-name}
```

if you want a **state** added enter the url and press ENTER.

*an example of a simple(non-nested) state*

```javascript
$stateProvider.state('my-state',{
	url:'/my-state',
	templateUrl:'path-to-template/my-state.html',
	controller:'MyStateCtrl'
});
```

*an example of a nested state that applies to our setup*

```javascript
$stateProvider.state('app.my-state',{
	url:'my-state',
	views:{
		'main@':{
			templateUrl:'path-to-template/my-state.html',
			controller:'MyStateCtrl'
		}
	}

});
```

### 2. Service setup


```
$ yo cg-angular:service {my-service}
```

```javascript
angular.module('cms').factory('myService',function($http) {

	var service = {
		
		model:{
			// store the list of this service globally
			list:[],
			item:null
		},
		getList : function(){
			
		}
		
	}
	
	return service;
	
});
```

## API workflow

To add a new resource (/my-resource) copy and paste one of the current resources, empty the model and route function and require it in: 

```
resources/index.js
```

Add the routes using the app object

```javascript
app.get('/my-resource', function(req,res){

});
app.post('/my-resource', function(req,res){

});
app.put('/my-resource/:id', function(req,res){

});
app.delete('/my-resource/:id', function(req,res){

});
```








