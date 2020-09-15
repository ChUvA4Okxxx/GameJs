'use strict'

startGame()

function startGame(){
    const secret = getRandomNumber()

    let message = 'Введите число'

    while(true){
        const guess = prompt(message)

        if( guess === null){
            alert(`игра окончина загаданное число ${secret}`)
            break
        }
        if (!isValid(guess)){
            alert('Введите 4-х значное число с уникальными числами')
            continue
        }

        if(guess === secret){
            alert('Вы выиграли')
            break
        }

        let bulls = 0
        let cows = 0

        for(let i = 0; i < guess.length; i++){
            const index = secret.indexOf(guess[i])

            if(index === i){
                bulls++
            }else if (index > -1){
                cows++
            }
        }

        message = `${guess} - ${bulls} bulls, ${cows} cows \n ${message}`
    }
    
    function isValid(guess){
        
        const patern = /^\d{4}$/

        if (!patern.test(guess)){
            return false
        }
        
        //  return new Set(number).size === 4
        for( let i =0; i < guess.length; i++){
            if(guess.lastIndexOf(guess[i]) !== i){
                return false
            }
        }
        return true
    }
    console.log(secret)
    function getRandomNumber(){
        const secret = '1234567890'.split('')
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .join('')
        return secret
    }
}