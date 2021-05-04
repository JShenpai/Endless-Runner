/*
COLLABORATORS: Jordan Shen, Ethan Chen, Mathew Aceves
GAME TITLE: RESIST THE TEMPTATION
DATE COMPLETED: 5/5/2021
JUSTIFICATION:
Varying the sizes of the platforms as well as the placement of sandwiches and cones using RNG is something we're proud of implementing!
Making sure the player has a different experience each time is crucial when it comes to endless runners, so we're glad we were able
to implement multiple random elements. Additionally we were able to implement a dash mechanic which helps increase the movement options
in the game. This gives the player more skill expression in how they get from platform to platform while avoiding spikes.
Our game's theme was created in section when all of us were hungry! With the player running away from the unhealthy food avalanche, I believe
we did a great job depicting a dream world of fast food tempations in our sprite work!  
*/

let config =
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Cutscene1, Cutscene2, Menu, Play, End],
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keySPACE, keyD;

//set UI sizes
let borderUISize = game.config.height/50;