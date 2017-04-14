const app = angular.module("root", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/index",
            controller: "mainController"
        })
        .when("/register", {
            templateUrl: "partials/register",
            controller: "registerController"
        })
        .when("/login", {
            templateUrl: "partials/login"
        })
        .otherwise({
            template: "<h3>He's dead, Jim</h3>"
        });
});

app.controller("navController", function ($scope, $http, $rootScope, $location) {
    $scope.home = function () {
        $location.path("/");
    };

    $scope.login = function () {
        $location.path("/login");
    };

    $scope.register = function () {
        $location.path("/register");
    };
});

app.controller("registerController", function ($scope, $http) {
    $scope.register = function () {
        $http({
            url: "/auth/signup",
            method: "POST",
            params: {
                username: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            }
        }).then(function (response) {
            console.log(response);
        });
    };
});

app.controller("chatController", function ($scope, $http, $timeout) {
    const $chatMiddle = $(".chat-box-middle");

    $scope.messages = [];

    $http({url: "/chat/get-messages"}).then(function (response) {
        angular.forEach(response.data, function (messageArray) {
            $scope.messages.push(messageArray.message);
        });

        $timeout(function () {
            $chatMiddle.animate({scrollTop: $chatMiddle.prop("scrollHeight")}, "slow");
        }, 0, false);
    });

    $scope.sendMessage = function (keyEvent) {
        if (keyEvent.which === 13 && $scope.chatMessage !== "") {
            $http({
                url: "/chat/send-message",
                method: "POST",
                params: {message: $scope.chatMessage}
            }).then(function (response) {
                $scope.messages.push(response.data);
                $chatMiddle.animate({scrollTop: $chatMiddle.prop("scrollHeight")}, "slow");
            });

            $scope.chatMessage = "";
        }
    };
});