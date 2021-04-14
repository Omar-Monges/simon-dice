const topLeft = document.getElementById('topLeft');
const topRight = document.getElementById('topRight');
const bottomLeft = document.getElementById('bottomLeft');
const bottomRight = document.getElementById('bottomRight');
const btnInit = document.getElementById('btnInit')
class Game {
    constructor() {
        this.getStarted()
        this.generatorRandom()
        this.nextLevel()
    }
    getStarted() {
        btnInit.classList.add('hide');
        this.level = 1;
        this.colors = {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
        }
    }
    generatorRandom() {
        this.random = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    nextLevel() {
        this.lightUpSequence();
    }
    transformColorNumber(number) {
        switch (number) {
            case 0:
                return 'topLeft';
            case 1:
                return 'topRight';
            case 2:
                return 'bottomLeft';
            case 3:
                return 'bottomRight';
        }
    }
    lightUpSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformColorNumber(this.random[i]);
            setTimeout(() => {
                this.lightUpColor(color)
                console.log(color);
            }, 1000 * i);
        }
    }
    lightUpColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.lightDownColor(color), 350);
    }
    lightDownColor(color) {
        this.colors[color].classList.remove('light');
    }
}
let startGame = () => {
    window.game = new Game();
}