import Game from '../../tetris/src/js/Game'


test('game test',()=>{
   const game = new Game();
   expect(game.game.length).toBe(100)
});