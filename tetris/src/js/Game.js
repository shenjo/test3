export default class Game {
    constructor({width = 10, height = 10} = {}) {
        this.width = width;
        this.height = height;
        this.game = new Array(width * height).fill(0);
    }


}