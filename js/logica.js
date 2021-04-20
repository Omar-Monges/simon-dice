const topLeft = document.getElementById('topLeft');
const topRight = document.getElementById('topRight');
const bottomLeft = document.getElementById('bottomLeft');
const bottomRight = document.getElementById('bottomRight');
const btnInit = document.getElementById('btnInit');
const LAST_LEVEL = 3;
class Game {
    constructor() {
        this.getStarted = this.getStarted.bind(this);
        this.getStarted();
        this.generatorRandom();
        setTimeout(this.nextLevel, 500);
    }
    getStarted() {
        this.nextLevel = this.nextLevel.bind(this);
        // this.selectColor = this.selectColor.bind(this)
        this.toggleBtnInit();
        this.level = 1;
        this.colors = {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
        }
    }
    toggleBtnInit() {
        if (btnInit.classList.contains('hide')) {
            btnInit.classList.remove('hide');
        } else {
            btnInit.classList.add('hide');
        }
    }
    generatorRandom() {
        this.random = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    nextLevel() {
        this.subLevel = 0;
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
                // console.log(color);
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
    gameWin(){
        swal('Platzi', 'Game win!!!', 'success')
            .then(this.getStarted)
    }
    gameLose(){
        swal('Platzi', 'Game lose!!!', 'error')
            .then(() => {
                this.removeEventClick();
                this.getStarted();
            })
    }
    selectColor(ev) {
        const nameButton = ev.target.dataset.button;
        let numberButton = this.transformNameNumber(nameButton);
        console.log(numberButton);
        this.lightUpColor(nameButton);
        if (numberButton === this.random[this.subLevel]) {
            this.subLevel++;
            if (this.subLevel === this.level) {
                this.level++;
                this.removeEventClick();
                if (this.level === (LAST_LEVEL + 1)) {
                    this.gameWin();
                } else {
                    setTimeout(this.nextLevel, 1500);
                }
            }
        } else {
            this.gameLose();
        }
    }
}
let startGame = () => {
    window.game = new Game();
}