let score
const squaresContainer = document.getElementById('squares-container')
const scoreDisplay = document.getElementById('score')
const restartButton = document.getElementById('restart-btn')
const winDeclaration = document.getElementById('win-declaration')
let squaresArray = []

//Must be an even number that can divide into pairs for each 
//type category
const numOfSquares = 16

const typeCategories = ['red', 'green', 'blue']
let flippedSquares = []


restartButton.addEventListener('click', () => restart())

function restart() {
  for (let i = 0; i < numOfSquares; i++) {
    const el = document.getElementById(`square-${i}`)
    squaresContainer.removeChild(el)
  }
  winDeclaration.classList.add('hidden')
  setup()
}

function setup() {
  score = 0
  scoreDisplay.textContent = score
  squaresArray = []
  setSquaresArray()
  assignTypeClasses()
}


function setSquaresArray() {
  
  const typesArray = generateRandomTypesArray()

  for(let i = 0; i < numOfSquares; i++) {
    const squareElement = document.createElement('div')
    squareElement.id = `square-${i}`
    squareElement.className = "square face-down"
    squaresContainer.appendChild(squareElement)

    const squareObject = {
      element: squareElement,
      type: typesArray[i],
      isFlipped: false,
      matched: false
    }
    
    squaresArray.push(squareObject)
    squareElement.addEventListener('click', () => handleSquareClick(squareObject));
  }
}

function assignTypeClasses() {

  for (let i = 0; i < numOfSquares; i++){
    let square = squaresArray[i]
    // console.log(square)
    if(square.type == 'red') {
      square.element.classList.add('red')
    } else if (square.type == 'green') {
      square.element.classList.add('green')
    } else if (square.type == 'blue'){
      square.element.classList.add('blue')
    }
  }
}

function generateRandomTypesArray() {
  const typesArray = []

  //create equal amount of types
  for (let i = 0; i < numOfSquares; i++){
    if(i < 4) {
      typesArray.push(typeCategories[0])
    } else if (i < 8) {
      typesArray.push(typeCategories[1])
    } else {
      typesArray.push(typeCategories[2])
    }
  }

  typesArray.sort(() => Math.random() - 0.5);
  return typesArray
}

setup()

// generateRandomTypes2()


function handleSquareClick(square) {
  if (square.matched) return
  square.isFlipped = true
  square.element.classList.remove('face-down')
  flippedSquares.push(square)
  
  if (isPairFlipped()) {
    console.log("pair has been flipped")
    const sq1 = flippedSquares[0]
    const sq2 = flippedSquares[1]
    if(isPairMatched()) {
      console.log('pair matched')
      sq1.matched = true
      sq2.matched = true
      score += 2
      scoreDisplay.textContent = score
      isAllMatched()
    } else {
      console.log('pair not matched')
      setTimeout(function() {
        sq1.isFlipped = false
        sq1.element.classList.add('face-down')
        sq2.isFlipped = false
        sq2.element.classList.add('face-down')
       }, 1000);
       
    }
    
    flippedSquares = []
  }
}

function isPairFlipped() {
  return flippedSquares.length == 2
}

function isPairMatched() {
  return (flippedSquares[0].type === flippedSquares[1].type)
}

function isAllMatched() {
  let isGameFinished = squaresArray.every(square => {
    return square.matched
  })
  
  if (isGameFinished) {
    console.log("Game Ended")
    winDeclaration.classList.remove('hidden')
    return true
    
  } else {
    return false
  }
}






































// let score = 0
// const squaresContainer = document.getElementById('squares-container')
// const squaresArray = []
// const scoreDisplay = document.getElementById('score')
// scoreDisplay.textContent = score


// const typeArray = ['red', 'green', 'blue']

// let flippedSquares = []

// function setup() {
//   score = 0
//   setSquaresArray()
//   generateRandomTypes()
  
// }

// function setSquaresArray() {
  
//   for(let i = 0; i < 12; i++) {
//     const squareElement = document.createElement('div')
//     squareElement.id = `square-${i}`
//     squareElement.className = "square face-down"
//     squaresContainer.appendChild(squareElement)

//     const squareObject = {
//       element: squareElement,
//       type: "",
//       isFlipped: false,
//       matched: false
//     }
    
//     squaresArray.push(squareObject)
//     squareElement.addEventListener('click', () => handleSquareClick(squareObject));
//   }
// }

// //assign random types to square objects and add corresponding classes
// function generateRandomTypes() {
//   //Will just return non random types for now

//   for (let i = 0; i < squaresArray.length; i++){
//     let square = squaresArray[i]
//     if(i < 4) {
//       square.type = typeArray[0]
//       square.element.classList.add('red')
//     } else if (i < 8) {
//       square.type = typeArray[1]
//       square.element.classList.add('green')
//     } else {
//       square.type = typeArray[2]
//       square.element.classList.add('blue')
//     }
//   }




//   // const returnArray = []
//   // const types = [[1,1,1,1],[2,2,2,2],[3,3]];
  
//   // const arr = new Array(10).fill(0)

//   // while(returnArray.length < 10) {
//   //   let rand = Math.floor(Math.random() * types.length)
//   //   returnArray.push(types[rand].pop)
   
//   // }

// }

// function handleSquareClick(square) {
//   if (square.matched) return
//   square.isFlipped = true
//   square.element.classList.remove('face-down')
//   flippedSquares.push(square)

//   if (isPairFlipped()) {
//     console.log("pair has been flipped")
//     const sq1 = flippedSquares[0]
//     const sq2 = flippedSquares[1]
//     if(isPairMatched()) {
//       console.log('pair matched')
//       sq1.matched = true
//       sq2.matched = true
//       score += 2
//       scoreDisplay.textContent = score
//       isAllMatched()
//     } else {
//       console.log('pair not matched')
//       setTimeout(function() {
//         sq1.isFlipped = false
//         sq1.element.classList.add('face-down')
//         sq2.isFlipped = false
//         sq2.element.classList.add('face-down')
//        }, 1000);
      
//     }
    
//     flippedSquares = []
//   }
// }

// function isPairFlipped() {
//   return flippedSquares.length == 2
// }

// function isPairMatched() {
//   return (flippedSquares[0].type === flippedSquares[1].type)
// }

// function isAllMatched() {
//   let isGameFinished = squaresArray.every(square => {
//     return square.matched
//   })

//   if (isGameFinished) {
//     console.log("Game Ended")
//     return true

//   } else {
//     return false
//   }
// }

// setup()




// let score = 0
// const squaresContainer = document.getElementById('squares-container')
// const squaresArray = []

// const typeArray = ['red', 'green', 'blue']


// function setup() {
//   score = 0
//   setSquaresArray()
  
//   // console.log(squaresArray)
//   // console.log(squaresArray[0].element)
// }

// function setSquaresArray() {
  
//   for(let i = 0; i < 12; i++) {
//     //dont think object id is necessary?
//     //can get id from element id
//     const squareElement = document.createElement('div')
//     squareElement.id = `square-${i}`
//     squareElement.className = "square"
//     squaresContainer.appendChild(squareElement)
    
//     const squareObject = {
//       element: squareElement,
//       type: "",
//       isFlipped: false
//     }
    
//     squaresArray.push(squareObject)
//   }
// }

// //assign random types to square objects and add corresponding classes
// function generateRandomTypes() {
//   //Will just return non random types for now

//   for (let i = 0; i < squaresArray.length; i++){
//     if(i < 4) {
//       squaresArray[i].type = typeArray[0]
//     } else if (i < 8) {
//       squaresArray[i].type = typeArray[1]
//     } else {
//       squaresArray[i].type = typeArray[2]
//     }
//   }

//   //squaresArray[i].element.classList.add('red')

//   // const returnArray = []
//   // const types = [[1,1,1,1],[2,2,2,2],[3,3]];
  
//   // const arr = new Array(10).fill(0)

//   // while(returnArray.length < 10) {
//   //   let rand = Math.floor(Math.random() * types.length)
//   //   returnArray.push(types[rand].pop)
   
//   // }

// }

// setup()
// generateRandomTypes()


