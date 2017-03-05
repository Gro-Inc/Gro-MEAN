var app = angular.module("root", []);

app.controller("registerController", function ($scope, $http) {
    $scope.register = function () {
        $http({url: "/services/user/register", method: "POST", params: {username: $scope.regUsername, password: $scope.regPassword}}).then(
            function (response) {
            });
    };
});

app.controller("chatController", function ($scope, $http) {
    $scope.messages = [];

    $http({url: "/services/chat/get-messages"}).then(function (response) {
        angular.forEach(response.data.data, function (message) {
            $scope.messages.push(message);
        });
    });

    $scope.sendMessage = function (keyEvent) {
        if (keyEvent.which === 13 && $scope.chatMessage !== "") {
            $http({url: "/services/chat/send-message", method: "POST", params: {message: $scope.chatMessage}}).then(function (response) {
                $scope.messages.push(response.data.data);
            });

            $scope.chatMessage = "";
        }
    };
});