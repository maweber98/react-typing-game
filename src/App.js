import React, {useState, useEffect, useRef} from "react"

const App = () => {
    const STARTING_TIME = 60
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    // const [wordCount, setWordCount] = useState(0)

    const textAreaRef = useRef(null)
    
    const handleChange = (e) => {
        const {value} = e.target
        setText(value)
    }
    
    const calculateWordCount = (text) => {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
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
    
    useEffect(() => {

        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div className="container">
            <h1 className="fs-1 m-3">How fast do you type?</h1>

            <div className="form-floating">
                <textarea 
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    ref={textAreaRef}
                    onChange={handleChange}
                    value={text}
                    disabled={!isTimeRunning}
                    style={{height: "200px"}}
                >
                </textarea>
            </div>
            <h4 className="fs-3 m-3">Time remaining: {timeRemaining}</h4>
            <button 
                className="btn btn-primary"
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h1 className="fs-3 m-3">Word count: {calculateWordCount(text)}</h1>
        </div>
    )
}

export default App