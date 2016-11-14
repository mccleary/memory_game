var app = angular.module('memory', []);
app.controller('MemoryController', function($scope, $timeout) {
  var monsters = [];


  $scope.monsterGenerator = function() {
    while (monsters.length < 4) {
      var num = $scope.random();
      if (monsters.indexOf(num) === -1) {
        monsters.push(num);
        monsters.push(num);

      }
    }
  };

  $scope.shuffle = function(arr) {
    var i = 0;
        j = 0;
        temp = null;
    for (i = arr.length - 1; i > 0; i -= 1)  {
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

  $scope.grid = [
    [$scope.cards[0], $scope.cards[1], $scope.cards[2], $scope.cards[3]], [$scope.cards[4], $scope.cards[5], $scope.cards[6], $scope.cards[7]]
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
