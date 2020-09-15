'use strict'

document.querySelector('.new-game').addEventListener('click', (e) => {
    location.reload()
})

startGame(8, 8, 10)

function startGame(WIDTH, HEIGTH, BOMBS_COINT){
    const field = document.querySelector('.field')
    const cellsCount = WIDTH * HEIGTH
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children]

    let closedCount = cellsCount

    const bombs = [...Array(cellsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, BOMBS_COINT)

    field.addEventListener('click', (e) => {
        if(e.target.tagName !== 'BUTTON'){
            return
        }

        const index = cells.indexOf(e.target)
        const column = index % WIDTH   
        const row = Math.floor(index / WIDTH)
        open(row, column)
    })

    function isValid(row, column){
        return row >=0 
        && row < HEIGTH
        && column >= 0
        && column < WIDTH
    }

    
    function getCount(row, column){
        let count = 0
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
               if(isBomb(row + y, column +x)){
                   count++
               }
            }
        }
        return count
    }

    function open (row, column){
        if(!isValid(row, column)) return

        const index = row * WIDTH + column
        const cell = cells[index]
        if(cell.disabled === true) return
        cell.disabled = true
       

        if(isBomb(row, column)){
            cell.innerHTML =  'X'
            alert('you loose')
            return
        }

        closedCount--
        if(closedCount <= BOMBS_COINT){
            alert('you won!')
        }
        
        const count =  getCount(row, column)

        if (count !== 0 ){
            cell.innerHTML = count
            return
        }

        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
               if(open(row + y, column +x)){
               }
            }
        }
    }

    function isBomb(row, column){
        if(!isValid(row, column)) return false

        const index = row * WIDTH + column

        return bombs.includes(index)
    }
}

