import { createBoard } from './minesweeper.js'

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 2

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
// adds styling to grid
boardElement.style.setProperty('--size', BOARD_SIZE)

console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
    })
})