import { createBoard, markTile } from './minesweeper.js'

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 3

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeft = document.querySelector('[data-mine-count]')


console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {

        })
        tile.element.addEventListener('contextmenu', evt => {
            evt.preventDefault()
            markTile(tile)
        })
    })
})

// adds styling to grid
boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeft.textContent = NUMBER_OF_MINES