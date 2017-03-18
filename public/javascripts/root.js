var app = angular.module("root", []);

app.controller("registerController", function ($scope, $http) {
    $scope.register = function () {
        $http({
            url: "/user/register",
            method: "POST",
            params: {username: $scope.regUsername, password: $scope.regPassword}
        }).then(
            function (response) {
            });
    };
});

app.controller("chatController", function ($scope, $http) {
    $scope.messages = [];
    $http({url: "/chat/get-messages"}).then(function (response) {
        angular.forEach(response.data, function (messageArray) {
            $scope.messages.push(messageArray.message);
            $(".chat-box-middle").animate({scrollTop: $('.chat-box-middle').prop("scrollHeight")}, 1000);
        });
    });

    $scope.sendMessage = function (keyEvent) {
        if (keyEvent.which === 13 && $scope.chatMessage !== "") {
            $http({
                url: "/chat/send-message",
                method: "POST",
                params: {message: $scope.chatMessage}
            }).then(function (response) {
                $scope.messages.push(response.data);
                $(".chat-box-middle").animate({scrollTop: $('.chat-box-middle').prop("scrollHeight")}, 1000);
            });

            $scope.chatMessage = "";
        }
    };
});