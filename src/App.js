import React, {useState, useEffect, useRef} from 'react';
import './styles.css';

function App(){

  const START_TIME = 15

  const [isTimeRunning, setisTimeRunning] = useState(false)
  const [timeRemaining, settimeRemaining] = useState(START_TIME)
  const [text, setText]= useState("")
  const [wordCount, setwordCount] = useState(0)
  const textBoxRef = useRef(null)

  function handleChange(e){
    const{value} = e.target
    setText(value)
  }

  function calculateWordCount(text){
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  function startGame(){
    setisTimeRunning(true)
    settimeRemaining(START_TIME)
    setText("")
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }
  function endGame(){
    setisTimeRunning(false)
    setwordCount(calculateWordCount(text))

  }
  useEffect(() => {
    if(isTimeRunning === true && timeRemaining > 0){
        setTimeout( () => {
            settimeRemaining(time => time -1)
        },1000)
      } else if (timeRemaining === 0){
        endGame()
      }
  }, [timeRemaining, isTimeRunning])

  return(
    <div>
    <h1>How fast do you type?</h1>
    <textarea
        ref={textBoxRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
    />
    <h4>Time remaining: {timeRemaining}</h4>
    <button 
        onClick={startGame}
        disabled={isTimeRunning}
    >
        Start
    </button>
    <h1>Word count: {wordCount}</h1>
  </div>

  )
}


export default App;
