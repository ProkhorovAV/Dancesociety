'use strict';
// подгрузка модулей
angular.module('myApp', [
	'ui.router',
	'ui.bootstrap',																										// bootstrap для вкладок
	'ngResource',  																										// ресурс $resurce
	'cgNotify',
	'myApp.controllers.Index',
	'myApp.controllers.Main',
	'myApp.controllers.News',
	'myApp.controllers.Heder',
	'myApp.controllers.MyMessages',
	'myApp.controllers.Jobs',
	'myApp.controllers.Videos',
	'myApp.controllers.Photos',
	'myApp.controllers.PagesLists',
	'myApp.controllers.PageHeder',
	'myApp.controller.PageResume',
	'myApp.controller.PageNews',
	'myApp.controllers.PageVacancy',
	'myApp.controllers.PageSubscribers',
	'myApp.controllers.PageGallery',
	'myApp.controllers.PageVideo',
	'myApp.controllers.PeopleHeder',
	'myApp.controllers.PeopleResume',
	'myApp.controllers.PeopleNews',
	'myApp.controllers.PeopleReview',
	'myApp.controllers.PeopleSubscriers',
	'myApp.controllers.PeopleFollowers',
	'myApp.controllers.PeopleGallery',
	'myApp.controllers.PeopleVacancy',
	'myApp.controllers.PeopleVideo',
	'myApp.controllers.PeoplePages',
	'myApp.services.PHP_server',
	'myApp.controllers.CreatGroup',
	'myApp.controllers.SelectImage',
	'myApp.controller.SelectVideo'
])
.constant('SERVER', {
	"DATA":" http://dancesociety:88/data/server/Date.php",
	"MAXCOUNT":6
})

