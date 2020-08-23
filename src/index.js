import { init, Sprite, GameLoop, Scene, Text, initKeys, keyPressed, bindKeys, initPointer, track } from 'kontra';

import './index.css';

const GAME_WIDTH = 640
const GAME_HEIGHT = 480;

document.addEventListener('DOMContentLoaded', () => {
    const bkCanvas = document.getElementById('bk-canvas');
    bkCanvas.width = GAME_WIDTH;
    bkCanvas.height = GAME_HEIGHT;

    const aspectRatio = GAME_WIDTH / GAME_HEIGHT;

    const fgCanvas = document.getElementById('fg-canvas');
    const fgContext = fgCanvas.getContext('2d');
    fgContext.mozImageSmoothingEnabled = false;
    fgContext.webkitImageSmoothingEnabled = false;
    fgContext.msImageSmoothingEnabled = false;
    fgContext.imageSmoothingEnabled = false;
    const setForegroundCanvasDimensions = () => {
        let width = window.innerWidth;
        let height = window.innerHeight;

        if (width / GAME_WIDTH < height / GAME_HEIGHT) {
            height = width / aspectRatio;
        } else {
            width = aspectRatio * height;
        }

        fgCanvas.width = width;
        fgCanvas.height = height;
    };
    setForegroundCanvasDimensions();

    // Init
    init('bk-canvas');
    initKeys();
    initPointer();

    window.addEventListener('resize', () => {
        setForegroundCanvasDimensions();
    });

    fgCanvas.addEventListener('mousedown', function (e) {
        
    });
    fgCanvas.addEventListener('touchstart', function (e) {

    });
    fgCanvas.addEventListener('mouseup', function () {

    });
    fgCanvas.addEventListener('touchend', function () {

    });
    fgCanvas.addEventListener('touchcancel', function () {

    });
    fgCanvas.addEventListener('blur', function (e) {
        
    });
    fgCanvas.addEventListener('mousemove', function () {

    });
    fgCanvas.addEventListener('touchmove', function () {

    });

    // Game
    const text = Text({
        text: 'Hello world!',
        font: '32px sans-serif',
        color: 'white',
        x: 320,
        y: 240,
        anchor: { x: 0.5, y: 0.5 },
        textAlign: 'center',

        onOver: function() {
            this.color = 'red';
        },

        onOut: function() {
            this.color = 'white';
        },
    });
    track(text);

    const sprite = Sprite({
        x: 100,
        y: 80,
        color: 'red',
        width: 20,
        height: 40,

        onOver: function() {
            this.color = 'white';
        },

        onOut: function() {
            this.color = 'red';
        },
    });
    track(sprite);

    const scene = Scene({
        id: 'room',
        children: [sprite],
    });

    const loop = GameLoop({
        update: () => {
            let dx = 0;
            if (keyPressed('left')) {
                dx -= 5;
            }
            if (keyPressed('right')) {
                dx += 5;
            }
            sprite.dx = dx;

            let dy = 0;
            if (keyPressed('up')) {
                dy -= 5;
            }
            if (keyPressed('down')) {
                dy += 5;
            }
            sprite.dy = dy;

            sprite.update();
        },

        render: () => {
            scene.render();

            text.render();

            fgContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
            fgContext.drawImage(bkCanvas, 0, 0, fgCanvas.width, fgCanvas.height);
        },
    });
    loop.start();

});
