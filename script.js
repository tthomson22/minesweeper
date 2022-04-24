import { 
    TILE_STATUSES, 
    createBoard, 
    markTile, 
    revealTile, 
    checkWin, 
    checkLost 
} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeft = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')

// adds styling to grid
boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeft.textContent = NUMBER_OF_MINES

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameEnd()
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

function checkGameEnd() {
    const win = checkWin(board)
    const lost = checkLost(board)

    if(win || lost){
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }
    if(win){
        messageText.textContent = 'You Win'
    }

    if(lost){
        messageText.textContent = 'You Lost'
        board.forEach(row => {
            row.forEach(tile => {
                // if tile is marked make it red if lost
                if(tile.status === TILE_STATUSES.MARKED) markTile(tile)
                // if mine hit display all mines on the board
                if(tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(evt){
    evt.stopImmediatePropagation()
}