import DisplayWord from "./DisplayWord"

const StatGroup = ({ top, bottom }) => {
  return (
    <div className="stat-group">
      <div className='top'>{top}</div>
      <div className="bottom">{bottom}</div>
    </div>
  )
}

const Center = ({ currentWord, onChangeHandler, onKeyDownHandler, wordPairs, currentIndex, restartHandler, showResult, seconds }) => {
  const totalWords = wordPairs.length
  let correctWords = 0
  for (const [test, word] of wordPairs) correctWords += test.trim() === word.trim()

  const accuracy = Math.round((correctWords / totalWords) * 100)
  const wpm = seconds === 0 ? 0 : (correctWords / (seconds / 60))

  const testStyle = {
    opacity: `${showResult ? 0 : 1}`,
  }
  console.log(testStyle)

  return (
    <div className='center'>
      <input className='wordInput' id='input' autoComplete='off' autoFocus={true} value={currentWord} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>

      <div className='test-wrapper' style={testStyle} onClick={() => document.getElementById("input").focus()}>
        <div className='stats'>
          <div className='timer'>{seconds.toFixed(1)}</div>
        </div>

        <div className='words'>
          {wordPairs.map((pair, i) => <DisplayWord pair={pair} isCurrent={i === currentIndex}/>)}
        </div>
      </div>
      <div className='result' hidden={!showResult} style={{opacity: `${showResult ? 1 : 0}`}}>
        <StatGroup top='time' bottom={`${seconds.toFixed(1)}s`} />
        <StatGroup top='accuracy' bottom={`${accuracy}%`} />
        <StatGroup top='wpm' bottom={Math.floor(wpm)} />
      </div>

      <button class='restart-button' onClick={restartHandler}>Restart</button>
      
    </div>
  )
}

export default Center