var myApp = angular.module('LeagueStandingCalculatorApp',[]);  

myApp.controller('MainCtrl', ['$scope', function($scope) {
    $scope.newPlayer = new Player();
    $scope.players = [];
      
    $scope.addNewPlayer = function (newPlayer) {
        $scope.players.push(newPlayer);
        console.log($scope.players);
        console.log($scope.players.length)
        $scope.newPlayer = new Player();        
    }
    
     $scope.makeTourament = function (players) {
         $scope.touramentMade = true;
         toastr["success"]("League created!");         
         $scope.games = [];        
         for (var i=0; i<$scope.players.length; i++) {
             for (var j=0; j<$scope.players.length; j++) {
                 if (i!=j && i<j) {
                     console.log("Utakmice " + $scope.players[i].name + $scope.players[j].name);
                     game = new Game($scope.players[i].name, $scope.players[j].name)
                     $scope.games.push(game);
                     console.log("games" + JSON.stringify($scope.games));
                 }
             }
         } 
    }
     
    $scope.enterScore = function (game) {
        $scope.game = game;
        $scope.game.played = true;
         toastr["success"]("Score added!");           
        if ($scope.game.player1Goals > $scope.game.player2Goals) {
            console.log("player 1 wins");
            
            // player 1 adding points and goals...
            for (i=0;i<$scope.players.length; i++) {               
                if ($scope.players[i].name == $scope.game.player1) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].wins  = $scope.players[i].wins  +1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player1Goals;                       
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player2Goals; 
                    $scope.players[i].diff  = $scope.players[i].diff + $scope.game.player1Goals  - $scope.game.player2Goals;                     
                    $scope.players[i].points = $scope.players[i].points + 3;                    
                }
            }
            
            // player 2 adding points and goals...            
            for (i=0;i<$scope.players.length; i++) {               
                if ($scope.players[i].name == $scope.game.player2) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].loses  = $scope.players[i].loses  + 1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player2Goals;  
                    $scope.players[i].diff  = $scope.players[i].diff + $scope.game.player2Goals  - $scope.game.player1Goals;                      
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player1Goals;                   
                }
            }                        
        }
        
        else if ($scope.game.player1Goals == $scope.game.player2Goals) {
            console.log("player 1 wins");
            
            // player 1 adding points and goals...
            for (i=0;i<$scope.players.length; i++) {               
                console.log ($scope.game.player1, $scope.players[i].name  )
                if ($scope.players[i].name == $scope.game.player1) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].draws  = $scope.players[i].draws  +1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player1Goals;                       
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player2Goals;                
                    $scope.players[i].points = $scope.players[i].points + 1;                           
                }
            }
            
            // player 2 adding points and goals...            
            for (i=0;i<$scope.players.length; i++) {               
                if ($scope.players[i].name == $scope.game.player2) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].draws  = $scope.players[i].draws  + 1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player2Goals;                       
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player1Goals; 
                    $scope.players[i].diff  = $scope.players[i].diff +  $scope.game.player2Goals - $scope.game.player1Goals ;                    
                    $scope.players[i].points = $scope.players[i].points + 1;                   
                }
            }                        
        }
        
        else if ($scope.game.player1Goals < $scope.game.player2Goals) {
            console.log("player 2 wins");
            
            // player 1 adding points and goals...
            for (i=0;i<$scope.players.length; i++) {               
                console.log ($scope.game.player1, $scope.players[i].name  )
                if ($scope.players[i].name == $scope.game.player2) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].wins  = $scope.players[i].wins  +1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player2Goals;                       
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player1Goals; 
                    $scope.players[i].diff  = $scope.players[i].diff + $scope.game.player2Goals  - $scope.game.player1Goals;                    
                    $scope.players[i].points = $scope.players[i].points + 3;                    
                }
            }
            
            // player 2 adding points and goals...            
            for (i=0;i<$scope.players.length; i++) {               
                if ($scope.players[i].name == $scope.game.player1) {
                    $scope.players[i].matches  = $scope.players[i].matches  +1;   
                    $scope.players[i].loses  = $scope.players[i].loses  + 1;   
                    $scope.players[i].goals  = $scope.players[i].goals  + $scope.game.player1Goals;   
                    $scope.players[i].diff  = $scope.players[i].diff +  $scope.game.player1Goals - $scope.game.player2Goals ;                    
                    $scope.players[i].conceded  = $scope.players[i].conceded  + $scope.game.player1Goals;                   
                }
            }                                          
        }               
    }
    
}]);

    function Game(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Goals = 0;
        this.player2Goals= 0;
        this.played = false
    }

    function Player() {
        this.name = "";
        this.matches = 0;
        this.wins = 0;
        this.draws= 0;
        this.loses = 0;
        this.goals = 0;
        this.conceded= 0;
        this.diff = 0;
        this.points = 0
    }
