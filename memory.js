var app = angular.module('memory', []);
app.controller('MemoryController', function($scope) {
  var card1 = new Card("images/monsters-01.png", false, false);
  var card2 = new Card("images/monsters-02.png", false, false);
  var card3 = new Card("images/monsters-03.png", false, false);
  var card4 = new Card("images/monsters-04.png", false, false);
  var card5 = new Card("images/monsters-05.png", false, false);
  var card6 = new Card("images/monsters-06.png", false, false);
  var card7 = new Card("images/monsters-07.png", false, false);
  var card8 = new Card("images/monsters-08.png", false, false);

  $scope.grid = [
    [card1, card2, card3, card4], [card5, card6, card7, card8]
  ];
});

function Card(url, open, matched) {
  this.url = url;
  this.open = open;
  this.matched = matched;
}
