
let frontEndBools = [];
let underscoreArray = [];
let idWord; //have to declare globally 
let inputDiv = document.querySelector("#input")



//-----------------------THIS FETCH WILL START RIGHT AWAY AND RETRIEVE AN ID AND LETTER LENGTH ELSE---------------------
const startGame = () => {
 
    fetch("/hangman/words" ,{ //takes the path
        method: "GET",
        headers: {
            "accept": "application/json", // 
            "content-type": "application/json" //what this function is send to u
            }
    }).then(serverRes => {
        return (serverRes.json()) //we are returning it so its a promise itself we json to get the stuff in this promise
    }).then(item => {
        idWord = item.id
       // console.log(item) give us the lettercount and ID of word which we test on insomina
       let numOfLetters = item.letterCount //of the random word
       for(let i = 0;i < numOfLetters; i++) {
           frontEndBools.push(false);
           underscoreArray.push("_");
           let underscoreArrayInString = underscoreArray.join(" "); //toString give commas!!
           inputDiv.innerHTML = underscoreArrayInString
       }
    })

}
console.log(frontEndBools)
    startGame();

//--------------FRONT END(THIS FETCH BELOW ASKS FOR WHERE ITS TRUE IN THE BOOLEAN ARRAY ----------------------------
    const clicker = (event) => {

        event.preventDefault(); //stop the refresh

    let id = event.target.id //id of what was clicked
    let letterClicked = document.getElementById(id) // the whole element in html
    let letterHolder = letterClicked.value
    letterClicked.classList.toggle("pressed")
      
    fetch(`/hangman/guess/${idWord}/${letterHolder}`, { //passing this from above
        method: "GET",
        headers: {
            "accept": "application/json", // 
            "content-type": "application/json" //what this function is send to u
        }
    })
    .then(item => { //array of booleans
         return (item.json());
    })
    .then(boolReceived => {
        
        boolReceived.forEach((bool,index) => {
            if (bool === true) {
                frontEndBools[index] = true
                console.log(frontEndBools)
                underscoreArray[index] = `${letterHolder}`
                console.log(underscoreArray)
                let letterNoArray = underscoreArray.join(" ");
                inputDiv.innerHTML = letterNoArray
            }
        })
        
//**below was a previous way to replace letters but wouldnt work if same letter was in word**
        // boolReceived.forEach(bool => {

        //     if (bool === true) {
        //         let location = boolReceived.indexOf(bool)
        //         frontEndBools.splice(location,1,true)
        //         console.log(frontEndBools)
            
        //         underscoreArray.splice(location,1,`${letterHolder}`)
        //         console.log(underscoreArray)
        //     }
        // });
    })


    }

    console.log(underscoreArray)