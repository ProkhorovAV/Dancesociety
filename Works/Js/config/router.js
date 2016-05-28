'use strict';

// маршрутизатор

angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', {
                url: "/main",
                views: {
                    "context_page": {
                        templateUrl: "../views/main.html",
                        controller: "MainCtrl"
                    }
                }
            })
            .state('news', {
                url: "/news",
                views: {
                    "context_page": {
                        templateUrl: "../views/news_new.html",
                        controller: "NewsCtrl"
                    },
                    "header_page":{
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    }
                }
            })
            .state('jobs', {
                url: "/jobs",
                views: {
                    "context_page": {
                        templateUrl: "../views/jobs.html",
                        controller: "JobsCtrl"
                    },
                    "header_page":{
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    }
                }
            })
            .state('videos', {
                url: "/videos",
                views: {
                    "context_page": {
                        templateUrl: "../views/videos.html",
                        controller: "VideosCtrl"
                    },
                    "header_page":{
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    }
                }
            })
            .state('photos', {
                url: "/photos",
                views: {
                    "context_page": {
                        templateUrl: "../views/photos.html",
                        controller: "PhotosCtrl"
                    },
                    "header_page":{
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    }
                }
            })
            .state('pageslist', {
                url: "/pageslist",
                views: {
                    "header_page":{
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    },
                    "context_page": {
                        templateUrl: "../views/pageslist.html",
                        controller: "PagesListsCtrl"
                    }
                }
            })
            //  страницы людей
            .state('people', {
                url: '/people/:id',
                abstract: true,
                views: {
                    'context_page': {
                        templateUrl: "../views/panelTop.html"
                    },
                    "header_page": {
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    },
                    "food_page": {
                        templateUrl: "../views/people/peopleProfile.html",
                        // в нем ссылка на экран peopleheder
                        controller: "PeopleHederCtrl"
                    }
                }
            })
            .state('people.resume', {
                url: "/resume",
                templateUrl: '../views/people/peopleResume.html',
                controller: 'PeopleResumeCtrl'
            })
            .state('people.news', {
                url: "/news",
                templateUrl: '../views/people/peopleNews.html',
                controller: 'PeopleNewsCtrl'
            })
            // отзывы
            .state('people.review', {
                url: "/review",
                templateUrl: '../views/people/peopleReview.html',
                controller: 'PeopleReviewCtrl'
            })
            // подписчики
            .state('people.subscribers', {
                url: "/subscribers",
                templateUrl: '../views/people/peopleSubscribers.html',
                controller: 'PeopleSubscriersCtrl'
            })
            // на кого подписался
            .state('people.followers', {
                url: "/followers",
                templateUrl: '../views/people/peopleFollowers.html',
                controller: 'PeopleFollowersCtrl'
            })
            .state('people.gallery', {
                url: "/gallery",
                templateUrl: '../views/people/peopleGallery.html',
                controller: 'PeopleGalleryCtrl'
            })
            .state('people.vacancy', {
                url: "/vacancy",
                templateUrl: '../views/people/peopleVacancy.html',
                controller: 'PeopleVacancyCtrl'
            })
            .state('people.video', {
                url: "/video",
                templateUrl: '../views/people/peopleVideo.html',
                controller: 'PeopleVideoCtrl'
            })
            .state('people.pages', {
                url: "/pages",
                templateUrl: '../views/people/peoplePages.html',
                controller: 'PeoplePagesCtrl'
            })


            // страницы групп
            .state('page', {
                url: '/page/:id',
                abstract: true,
                views: {
                    'context_page': {
                        templateUrl: "../views/panelTop.html"
                    }
                   ,
                    // верхняя панель меню
                    "header_page": {
                        templateUrl: "../views/heder.html",
                        controller: "HederCtrl"
                    }
                    ,
                        // низ в котором есть продолжение через фильтр
                    "food_page": {
                        templateUrl: "../views/pages/pageHeder.html",
                        controller: "PageHederCtrl"
                    }
                }
            })
            .state('page.resume', {
                  url: '/resume',
                  templateUrl: "../views/pages/pageResume.html",
                  controller: "PageResumeCtrl"
            })
            .state('page.news', {
                url: '/news',
                templateUrl: '../views/pages/pageNews.html',
                controller: 'PageNewsCtrl'
            })
            .state('page.vacancy', {
                url: '/vacancy',
                templateUrl: '../views/pages/pageVacancy.html',
                controller: 'PageVacancyCtrl'
            })
            .state('page.subscribers', {
                url: '/subscribers',
                templateUrl: '../views/pages/pageSubscribers.html',
                controller: 'PageSubscribersCtrl'
            })
            .state('page.gallery', {
                url: '/gallery',
                templateUrl: '../views/pages/pageGallery.html',
                controller: 'PageGalleryCtrl'
            })
            .state('page.video', {
                url: '/video',
                templateUrl: '../views/pages/pageVideo.html',
                controller: 'PageVideoCtrl'
            })





    });


