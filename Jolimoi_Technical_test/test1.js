const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/getrn', (req, res) => {
    res.send(numberToRoman(Number(req.query.number)))
})

function numberToRoman(number){

  // Checks if the input is a valid number between 1 and 100 
  if( Number.isInteger(number) && number > 0 && number < 100 && !Number.isNaN(number)){
    let roman = "";
    const romanNumList = {XC:90,L:50, XL: 40, X:10, IX:9, V:5, IV:4, I:1};
    let a;
    for(let key in romanNumList){
        a = Math.floor(number / romanNumList[key]);
        if(a >= 0){
            for(let i = 0; i < a; i++){
              roman += key;
            }
          }
        number = number % romanNumList[key];
    }
    return roman;
    }

    else{
        return "ERROR"
    }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})