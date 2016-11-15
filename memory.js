function Card(monsterNum, open, matched) {
  this.url = 'images/monsters-' + monsterNum + '.png';
  this.open = open;
  this.matched = matched;
}


var app = angular.module('memory', []);
app.controller('MemoryController', function($scope, $timeout) {
  // variable to display difficulty selection menu
  $scope.menu = true;
  // holds randomly selected monster (img number 1 - 16)
  $scope.monsters = [];
  // number of unique monsters in a game
  $scope.uniqueMonsters = 16;
  // generated monster cards to be passed to the rows
  $scope.monsterCards = [];
  // number of rows (varies depending on game difficulty)
  $scope.numRows = 4;
  // number of monster cards in each row
  $scope.monsterCardsPerRow = 8;

  $scope.gameMode = function(str) {
    if (str === 'easy') {
      $scope.uniqueMonsters = 4;
      $scope.numRows = 2;
      $scope.monsterCardsPerRow = 4;
    }
    else if (str === 'medium') {
      $scope.uniqueMonsters = 9;
      $scope.numRows = 3;
      $scope.monsterCardsPerRow = 6;
    }
    else {
      $scope.uniqueMonsters = 16;
      $scope.numRows = 4;
      $scope.monsterCardsPerRow = 8;
    }
    $scope.menu = false;
    $scope.generateGame();
  };


  $scope.monsterGenerator = function() {
    // adds a unique, random monster to the monster array twice (so it can be used to make two matching cards)
    while ($scope.monsters.length < $scope.uniqueMonsters * 2) {
      var num = $scope.random();
      if ($scope.monsters.indexOf(num) === -1) {
        $scope.monsters.push(num);
        $scope.monsters.push(num);
      }
    }
    console.log($scope.monsters);
  };

  $scope.random = function() {
    // there are 16 unique monsters
    return Math.floor(Math.random() * 16) + 1;
  };

  $scope.shuffle = function(arr) {
    // used to shuffle the monster array before creating the cards
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

  $scope.generateGame = function() {
    // main game board
    $scope.grid = [];
    // generate monsters and shuffle their order
    $scope.monsterGenerator();
    $scope.shuffle($scope.monsters);
    // populate game board dynamically
    for (var i = 0; i < $scope.uniqueMonsters * 2; i++) {
      $scope.monsterCards.push(new Card($scope.monsters[i], false, false));
    }
    for (var i = 0; i < $scope.numRows; i++) {
      $scope.grid.push([]);
      for (var j = 0; j < $scope.monsterCardsPerRow; j++) {
        $scope.grid[i].push($scope.monsterCards.pop());
      }
    }
  };

  $scope.state = "first";
  $scope.firstCard = null;
  $scope.isDisabled = false;

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
        $scope.isDisabled = true;
        $timeout(function() {
          card.open = false;
          $scope.firstCard.open = false;
          $scope.isDisabled = false;
        }, 1000);
      }
      if ($scope.checkWin($scope.grid)) {
        $scope.message = "You win!";
        $timeout(function() {
          $scope.menu = true;
        }, 2000);
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
