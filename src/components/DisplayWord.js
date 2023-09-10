const DisplayWord = ({ pair, isCurrent }) => {
  let [test, input] = pair

  let letters = []
  test = test.slice(0, test.length - 1)
  if (input === '') {
    letters = [...test].map((letter) => <div className="letter">{letter}</div>)
  } else if (input.charAt(input.length - 1) === ' ') {

    input = input.slice(0, input.length - 1)
    for (let i = 0; i < Math.max(test.length, input.length); i++) {
      if (i < test.length) {
        if (i >= input.length || test[i] !== input[i]) {
          letters.push(<div className="letter incorrect">{test[i]}</div>)
        } else {
          letters.push(<div className="letter correct">{test[i]}</div>)
        }
      } else {
        letters.push(<div className="letter incorrect extra">{input[i]}</div>)
      }
    }

  } else {

    for (let i = 0; i < Math.max(test.length, input.length); i++) {
      if (i < test.length) {
        if (i >= input.length) {
          letters.push(<div className="letter">{test[i]}</div>)
        } else if (test[i] !== input[i]) {
          letters.push(<div className="letter incorrect">{test[i]}</div>)
        } else {
          letters.push(<div className="letter correct">{test[i]}</div>)
        }
      } else {
        letters.push(<div className="letter incorrect extra">{input[i]}</div>)
      }
    }

  }

  return (
    <div className={isCurrent ? 'word current' : 'word'}>
      {letters}
    </div>
  )
}

export default DisplayWord
