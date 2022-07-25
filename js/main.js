/*
 * snake, html5 snake game with pixi.js
 *
 * http://oguzhaneroglu.com/games/snake/
 * https://github.com/rohanrhu/snake
 *
 * Copyright (C) 2017, Oğuzhan Eroğlu <rohanrhu2@gmail.com>
 * Licensed under MIT
 */

var game;

$(document).ready(function (event) {
    var $gameOver = $('.gameOver');
    var $gameOver_startButton = $gameOver.find('.gameOver_startButton');
    var $gameOver_points = $gameOver.find('.gameMenu_box_points_number');

    var $pause = $('.pause');
    var $pause_continueButton = $pause.find('.pause_continueButton');
    var $pause_points = $pause.find('.gameMenu_box_points_number');

    //load font
    const fontFamily = 'Satoshi';
    let newStyle = document.createElement("style");
    let fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('../Satoshi-Variable.ttf');}";
    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);
    let span = document.createElement("span");
    span.style.fontFamily = fontFamily;
    document.body.appendChild(span);
    span.innerHTML = "?";
    span.style.display = "block";
    span.style.opacity = "0";

    game = new Game({
        view: $('.gameView').get(0)
    });

    game.events.finish = function (parameters) {
        $gameOver_points.html(parameters.points);
        $gameOver.stop().fadeIn(250);
    };

    game.events.begin = function () {
        $pause.stop().fadeOut(250);
        $gameOver.stop().fadeOut(250);
    };

    game.events.continue = function () {
        $pause.stop().fadeOut(250);
    };

    let first = true;

    $gameOver_startButton.on('click', function (event) {
        if (first) {
            first = false;
            game.continue();
        } else {
            game.newGame();
            game.play();
        }
    });

    $pause_continueButton.on('click', function (event) {
        game.continue();
    });

    setTimeout(() => {
        game.newGame();
        game.play();
    }, 1)

    setTimeout(() => {
        game.pause();
        $gameOver.stop().fadeIn(250);
    }, 1000)
});
