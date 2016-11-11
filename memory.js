var app = angular.module('memory', []);
app.controller('MemoryController', function($scope, $timeout) {
  var card1 = new Card("images/monsters-01.png", false, false);
  var card2 = new Card("images/monsters-02.png", false, false);
  var card3 = new Card("images/monsters-03.png", false, false);
  var card4 = new Card("images/monsters-04.png", false, false);
  var card5 = new Card("images/monsters-01.png", false, false);
  var card6 = new Card("images/monsters-02.png", false, false);
  var card7 = new Card("images/monsters-03.png", false, false);
  var card8 = new Card("images/monsters-04.png", false, false);

  $scope.grid = [
    [card1, card2, card3, card4], [card5, card6, card7, card8]
  ];

  $scope.state = "first";

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
      console.log(checkWin($scope.grid));
      // checkWin($scope.grid);
    }

  };

  $scope.firstCard = null;

});

function Card(url, open, matched) {
  this.url = url;
  this.open = open;
  this.matched = matched;
}



function checkWin(grid) {
  return grid.every(function(row) {
    return row.every(function(card) {
      return card.matched;
    });
  });

}
