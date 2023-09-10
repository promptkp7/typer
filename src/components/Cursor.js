const Cursor = ({ cursorStyle, hidden }) => {
  return (
    <div className='cursor' style={cursorStyle} hidden={hidden}></div>
  )
}

export default Cursor