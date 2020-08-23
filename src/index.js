import { init, Sprite, GameLoop, Scene, Text, initKeys, keyPressed, bindKeys, initPointer, track } from 'kontra';

import './index.css';

const GAME_WIDTH = 640
const GAME_HEIGHT = 480;

document.addEventListener('DOMContentLoaded', () => {
    const aspectRatio = GAME_WIDTH / GAME_HEIGHT;

    const canvas = document.getElementById('game-canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const setCanvasDimensions = () => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let width = window.innerWidth;
        let height = window.innerHeight;

        if (width / GAME_WIDTH < height / GAME_HEIGHT) {
            height = width / aspectRatio;
        } else {
            width = aspectRatio * height;
        }

        canvas.style.width = `${width / windowWidth * 100}%`;
        canvas.style.height = `${height / windowHeight * 100}%`;
    };

    // Init
    setCanvasDimensions();
    const { context } = init(canvas);
    initKeys();
    initPointer();

    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    window.addEventListener('resize', () => {
        setCanvasDimensions();
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

        onOver: function () {
            this.color = 'red';
        },

        onOut: function () {
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

        onOver: function () {
            this.color = 'white';
        },

        onOut: function () {
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
        },
    });
    loop.start();

});
