var app = angular.module("root", ["ngRoute"]);

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
    var $chatMiddle = $(".chat-box-middle");

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

app.config(function ($routeProvider) {
    $routeProvider
        .when("/register", {
            template: "<h1>Main</h1><p>Click on the links to change this content</p>"
        })
        .otherwise({
            template: "<h1>None</h1><p>Nothing has been selected</p>"
        });
});