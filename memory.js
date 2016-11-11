var app = angular.module('memory', []);
app.controller('MemoryController', function($scope, $timeout) {
  var monsters = [];


  $scope.monsterGenerator = function() {
    while (monsters.length < 4) {
      var num = $scope.random();
      if (monsters.indexOf(num) === -1) {
        monsters.push(num);
      }
    }
  };

  $scope.random = function() {
    return Math.floor(Math.random() * 16) + 1;
  };
  $scope.monsterGenerator();

  var card1 = new Card(monsters[0], false, false);
  var card2 = new Card(monsters[0], false, false);
  var card3 = new Card(monsters[1], false, false);
  var card4 = new Card(monsters[1], false, false);
  var card5 = new Card(monsters[2], false, false);
  var card6 = new Card(monsters[2], false, false);
  var card7 = new Card(monsters[3], false, false);
  var card8 = new Card(monsters[3], false, false);

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
