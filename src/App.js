import { useEffect, useRef, useState } from 'react';

import './App.css';
import Header from './components/Header';
import Center from './components/Center';
import Bottom from './components/Bottom';
import Cursor from './components/Cursor';

const App = () => {
  const testTexts = [
    'The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.',
    'It is our choices, Harry, that show what we truly are, far more than our abilities.',
    'It is better to be hated for what you are than to be loved for what you are not.',
    'I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.',
    'Today you are You, that is truer than true. There is no one alive who is Youer than You.',
    'Being human totally sucks most of the time. Videogames are the only thing that make life bearable.',
    'Remember, the firemen are rarely necessary. The public itself stopped reading of its own accord.',
    'Doublethink means the power of holding two contradictory beliefs in one\'s mind simultaneously, and accepting both of them.',
  ]
  const [testWords, setTestWords] = useState([])
  const [inputWords, setInputWords] = useState([])
  const [currentWord, setCurrentWord] = useState('')
  const [cursorStyle, setCursorStyle] = useState({})
  const [first, setFirst] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const handleStart = () => {
    setStartTime(Date.now())
    setNow(Date.now())

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

  const parseTestText = (texts) => {
    const text = texts[Math.floor(Math.random() * texts.length)]
    const testArrays = text.split(' ')
    setTestWords(testArrays.map((word) => word += ' '))
    setFirst(true)
  }

  useEffect(() => {
    parseTestText(testTexts)
    setFirst(true)
  }, [])
  
  const handleWord = (event) => {
    // if space is the last character, ignore the space
    // update inputWords, reset currentWord to empty string
    const word = event.target.value
    const length = word.length

    if (length === 0) {
      setCurrentWord('')
      return
    }

    const lastChar = word.charAt(length - 1)
    if (lastChar === ' ') {
      // ignore single space string
      if (word === ' ') return
      setInputWords(inputWords.concat([word]))
      setCurrentWord('')
    } else {
      setCurrentWord(word)
    }
  }

  const handleInputKey = (event) => {
    // go back to last word if backspace is pressed when currentWord is empty
    if (inputWords.length > 0 && currentWord.length === 0 && event.keyCode === 8) {
      // remove last word from inputWords
      // set currentWord to that
      const newInputWords = [...inputWords]
      setCurrentWord(newInputWords.pop())
      setInputWords(newInputWords)
    }
  }

  const wordPairs = []
  for (let i = 0; i < testWords.length; i++) {
    if (i > inputWords.length) {
      wordPairs.push([testWords[i], ''])
    } else if (i === inputWords.length) {
      wordPairs.push([testWords[i], currentWord])
    } else {
      wordPairs.push([testWords[i], inputWords[i]])
    }
  }

  const updateCursor = () => {
    const wordElements = [...document.getElementsByClassName('word')]
    const heights = []
    wordElements.forEach((element) => {
      const topOffset = element.getBoundingClientRect().top
      if (!heights.includes(topOffset)) heights.push(topOffset)
    });

    const currentWordElement = document.getElementsByClassName('word current')[0]
    if (!currentWordElement) return
    const offset = currentWordElement.getBoundingClientRect()
    setCursorStyle({
      top: `${offset.top}px`,
      left: `${offset.left + currentWord.length * 15}px`,
    })
  }

  useEffect(updateCursor, [inputWords, currentWord, first])

  useEffect(() => {
    // start timer
    if (inputWords.length === 0 && currentWord.length === 1) {
      handleStart()
    }

    // show result
    if (testWords.length === 0) return
    if (inputWords.length === testWords.length) {
      setShowResult(true)
      handleStop()
    } else {
      if (inputWords.length === testWords.length - 1) {
        const lastTest = testWords[testWords.length - 1]
        if (currentWord === lastTest.slice(0, lastTest.length - 1)) {
          setShowResult(true)
          handleStop()
        }
      }
    }
  }, [inputWords, testWords, currentWord])

  const restartHandler = () => {
    parseTestText(testTexts)
    setInputWords([])
    setCurrentWord('')
    setStartTime(null)
    setNow(null)
    setShowResult(false)
    handleStop()
    document.getElementById("input").focus()
  }

  useEffect(() => {
    let seconds = 0;
    if (startTime !== null && now !== null) {
      seconds = (now - startTime) / 1000
    }
    setSeconds(seconds)
  }, [startTime, now])

  return (
    <div className='app'>
      <Header />
      <Center
        currentWord={currentWord}
        onChangeHandler={handleWord}
        onKeyDownHandler={handleInputKey}
        wordPairs={wordPairs}
        currentIndex={inputWords.length}
        restartHandler={restartHandler}
        showResult={showResult}
        seconds={seconds}
      />
      <Cursor numLetter={currentWord.length} cursorStyle={cursorStyle} hidden={showResult}/>
      <Bottom />
    </div>
  )
}

export default App;
