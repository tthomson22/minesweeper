import { TILE_STATUSES, createBoard, markTile, revealTile } from './minesweeper.js'

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
            revealTile(board, tile)
        })
        tile.element.addEventListener('contextmenu', evt => {
            evt.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})

function listMinesLeft(){
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

    minesLeft.textContent = NUMBER_OF_MINES - markedTilesCount
}

// adds styling to grid
boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeft.textContent = NUMBER_OF_MINES