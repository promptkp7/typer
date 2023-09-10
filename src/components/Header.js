import logo from '../logo.png'; // Tell webpack this JS file uses this image
import '../styles/header.css'


const Header = () => {
  return (
    <div className='header'>
      <img className='logo' src={logo} alt='logo' />
      <div className='site-name'>Typing-Practice</div>
    </div>
  )
}

export default Header