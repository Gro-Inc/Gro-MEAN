const app = angular.module("root", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/index"
        })
        .when("/register", {
            templateUrl: "partials/register"
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

    $scope.logout = function () {
        firebase.auth().signOut().then(function () {
            console.log("Signed out");
            $location.path("/");
        }).catch(function (error) {
            console.log(error);
        });
    };
});

app.controller("loginController", function ($scope, $http, $rootScope, $location) {
    $scope.login = function () {
        $http({
            url: "/auth/login",
            method: "POST",
            params: {
                username: $scope.username,
                password: $scope.password
            }
        }).then(function (response) {
            $location.path("/");
        });
    };
});

app.controller("registerController", function ($scope, $http, $rootScope, $location) {
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
        }).then(function () {
            $location.path("/");
        });
    };
});

app.controller("chatController", function ($scope, $http, $timeout) {
    const $chatMiddle = $(".chat-box-middle");

    $scope.messages = [];

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.getToken(true).then(function (idToken) {
                $http({url: "/chat/get-messages", params: {token: idToken}}).then(function (response) {
                    angular.forEach(response.data, function (messageArray) {
                        if (messageArray !== null) {
                            $scope.messages.push(messageArray.text);
                        }
                    });

                    $timeout(function () {
                        $chatMiddle.animate({scrollTop: $chatMiddle.prop("scrollHeight")}, "slow");
                    }, 0, false);
                }, function (error) {
                    console.log(error);
                });

                $scope.sendMessage = function (keyEvent) {
                    if (keyEvent.which === 13 && $scope.chatMessage !== "") {
                        $http({
                            url: "/chat/send-message",
                            method: "POST",
                            params: {message: $scope.chatMessage, token: idToken}
                        }).then(function (response) {
                            $scope.messages.push(response.data);
                            $chatMiddle.animate({scrollTop: $chatMiddle.prop("scrollHeight")}, "slow");
                        });

                        $scope.chatMessage = "";
                    }
                };
            });
        }
    });
});