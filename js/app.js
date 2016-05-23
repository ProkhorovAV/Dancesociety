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
	'myApp.controllers.GroupLists',
	'myApp.controllers.GroupHeder',
	'myApp.controller.GroupResume',
	'myApp.controller.GroupNews',
	'myApp.controllers.GroupVacancy',
	'myApp.controllers.GroupSubscribers',
	'myApp.controllers.GroupGallery',
	'myApp.controllers.GroupVideo',
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

