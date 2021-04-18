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
        // this.selectColor = this.selectColor.bind(this)
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
        this.addEventClick()
    }
    transformNumberName(number) {
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
    transformNameNumber(name) {
        switch (name) {
            case 'topLeft':
                return 0;
            case 'topRight':
                return 1;
            case 'bottomLeft':
                return 2;
            case 'bottomRight':
                return 3;
        }
    }
    lightUpSequence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberName(this.random[i]);
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
    addEventClick() {
        this.colors.topLeft.addEventListener('click', this.selectColor.bind(this));
        this.colors.topRight.addEventListener('click', this.selectColor.bind(this));
        this.colors.bottomLeft.addEventListener('click', this.selectColor.bind(this));
        this.colors.bottomRight.addEventListener('click', this.selectColor.bind(this));
    }
    removeEventClick() {
        this.colors.topLeft.removeEventListener('click', this.selectColor.bind(this));
        this.colors.topRight.removeEventListener('click', this.selectColor.bind(this));
        this.colors.bottomLeft.removeEventListener('click', this.selectColor.bind(this));
        this.colors.bottomRight.removeEventListener('click', this.selectColor.bind(this));
    }
    selectColor(ev) {
        const nameButton = ev.target.dataset.button;
        const numberButton = this.transformNameNumber(nameButton);
        this.lightUpColor(nameButton);
    }
}
let startGame = () => {
    window.game = new Game();
}