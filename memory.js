var app = angular.module('memory', []);
app.controller('MemoryController', function($scope, $timeout) {
  $scope.monsters = [];

  $scope.monsterGenerator = function() {
    while ($scope.monsters.length < 8) {
      var num = $scope.random();
      if ($scope.monsters.indexOf(num) === -1) {
        $scope.monsters.push(num);
        $scope.monsters.push(num);

      }
    }
  };

  $scope.shuffle = function(arr) {
    var i = 0,
        j = 0,
        temp = null;
    for (i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };



  $scope.random = function() {
    return Math.floor(Math.random() * 16) + 1;
  };
  $scope.monsterGenerator();
  $scope.shuffle($scope.monsters);

  $scope.cards = [];

  for (var i = 0; i < 8; i++) {
    var random = Math.floor(Math.random() * 4);
    $scope.cards[i] = new Card(monsters[random], false, false);
  }

  var card1 = new Card($scope.monsters[0], false, false);
  var card2 = new Card($scope.monsters[1], false, false);
  var card3 = new Card($scope.monsters[2], false, false);
  var card4 = new Card($scope.monsters[3], false, false);
  var card5 = new Card($scope.monsters[4], false, false);
  var card6 = new Card($scope.monsters[5], false, false);
  var card7 = new Card($scope.monsters[6], false, false);
  var card8 = new Card($scope.monsters[7], false, false);

  $scope.grid = [
    [card1, card2, card3, card4], [card5, card6, card7, card8]
  ];

  $scope.state = "first";
  $scope.firstCard = null;

  $scope.flip = function(card) {
    if ($scope.state === "first") {
      card.open = true;
      $scope.firstCard = card;
      $scope.state = "second";
    } else {
      card.open = true;
      if (card.url === $scope.firstCard.url) {
        card.matched = true;
        $scope.firstCard.matched = true;
        $scope.state = "first";
      } else {
        $scope.state = "first";
        $timeout(function() {
          card.open = false;
          $scope.firstCard.open = false;
        }, 500);
      }
      if ($scope.checkWin($scope.grid)) {
        $scope.message = "You win!";
      }
    }
  };

  $scope.checkWin = function(grid) {
    return grid.every(function(row) {
      return row.every(function(card) {
        return card.matched;
      });
    });
  };


});

function Card(monsterNum, open, matched) {
  this.url = 'images/monsters-' + monsterNum + '.png';
  this.open = open;
  this.matched = matched;
}

function monsterGenerator() {

}
