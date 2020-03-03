const {data} = require("./data/words") 


//random word object from array of objects
const wordHandler = (req, res) => { 
    const random = Math.floor(Math.random() * data.length)
    const chosenWord = data[random];
    console.log(chosenWord)//reutrns the obj chosen
    const {letterCount:selectedWord, id:givenId} = chosenWord //deconstructed and assigned to the same name
    let returnedObj = {letterCount:selectedWord, id:givenId} //put the obj back together
    //console.log(returnedObj) //returning only what we need the ID of the word and the word count
    res.send(returnedObj)
}


const paramHandler = (req, res) => {
    //here we input the word Id and it resoved wih the word
        let word = req.params.wordId //id of the word 
        // console.log(word)
        
        const realWord = data.find(obj => {
            if (obj.id == word) {
                return obj
            }
        })
        const gameWord = realWord.word;
     
         // console.log(gameWord)


    //-----------------------splitting the random word-----------------------
          let splitWord = gameWord.split('')
    // //-----------------------creating a boolean checker array-----------------------
    boolArray = [] // set to false for each position
    for(let i = 0; i < splitWord.length; i++) {
        boolArray.push(false)
    }
    // console.log(boolArray)
    
    ////-----------------------the lettter in the url//-----------------------
    let letterUserInputs = req.params.letter
     console.log(letterUserInputs)
        
    splitWord.forEach((letter,index) => {
        if(letterUserInputs == letter) {
            boolArray[index] = true
        console.log(boolArray)
        }
    })

//BELOW WOULD NOT WORK AS IT WOULD ONLY CHANGE ONE LETTER IF A WORD HAD 2x same letter

        // for(let i = 0; i < splitWord.length; i++) {
        //     if(letter == splitWord[i]) {
        //         let placement = splitWord.indexOf(splitWord[i]) 
        //         // console.log(placement)
        //         boolArray.splice(placement,1,true)
        //         res.send(boolArray)
        //         // console.log(boolArray) // now would have 1 true if user pressed right word 
        //     }
        // }
// console.log(boolArray)
        res.send(boolArray)
    }

    module.exports = {wordHandler, paramHandler}

