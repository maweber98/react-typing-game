import React, {useState, useEffect, useRef} from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const App = () => {

    const STARTING_TIME = 60
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)

    const textAreaRef = useRef(null)
    
    const handleChange = (e) => {
        const {value} = e.target
        setText(value)
    }
    
    const calculateWordCount = (text) => {
        const wordsArr = text.trim().split(" ")
        console.log('word count: ', wordsArr.filter(word => word !== "").length)
        return (
            wordsArr.filter(word => word !== "").length
        )
    }
    
    const startGame = () => {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
        textAreaRef.current.disabled = false
        textAreaRef.current.focus()
    }
    
    const endGame = () => {
        setIsTimeRunning(false)
        // setWordCount(calculateWordCount(text))
    }

    const renderTime = ({ timeRemaining, remainingTime }) => {
        if (timeRemaining === 0) {
          return <div className="timer">Times up!</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
    };

    const renderWordCount = ({ timeRemaining }) => {
        if (timeRemaining === 0) {
            return <div className="timer">Times up!</div>;
          }
        
          return (
            <div className="timer">
              <div className="text">Word</div>
              <div className="value">{wordCount}</div>
              <div className="text">Count</div>
            </div>
          );
    };
    
    useEffect(() => {

        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])

    useEffect(() => {
        setWordCount(calculateWordCount(text))
    }, [text])
    
    return (
        <div className="container">
            <h1 className="fs-1 m-3">How fast do you type?</h1>

            <div className="form-floating">
                <textarea 
                    className="form-control grad" 
                    placeholder="Click Start" 
                    id="floatingTextarea2" 
                    ref={textAreaRef}
                    onChange={handleChange}
                    value={text}
                    disabled={!isTimeRunning}
                    style={{height: "200px"}}
                >
                </textarea>
            </div>

            {/* Test */}
            <div id = "boxes">      
            <div id = "leftbox"> 
                <CountdownCircleTimer
                    isPlaying={isTimeRunning}
                    duration={STARTING_TIME}
                    colors={[["#FF0000", 0.33], ["#F7B801", 0.33], ["#FFFFFF"]]}
                    onComplete={() => [true, 1000]}
                    >
                    {renderTime}
                </CountdownCircleTimer>
            </div>  
              
            <div id = "middlebox"> 
                <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    style={{width: "100%"}}
                    onClick={startGame}
                    disabled={isTimeRunning}
                >   
                Start
                </button>
            </div> 
              
            <div id = "rightbox"> 
                <div style={{float:"right"}}>
                <CountdownCircleTimer
                    isPlaying={isTimeRunning}
                    duration={STARTING_TIME}
                    text={text}
                    colors={[["#FF0000", 0.33], ["#F7B801", 0.33], ["#FFFFFF"]]}
                    onComplete={() => [true, 1000]}
                    >
                    {renderWordCount}
                </CountdownCircleTimer>
                </div>
            </div> 
        </div> 

        </div>
    )
}

export default App