import './Header.scss'
import { NavLink } from 'react-router-dom';
const Header = () => {
    return(
            <header className="header">
                <NavLink end to='/' className="header-text">Play Quiz</NavLink>
                <NavLink end to='/newQuiz' className='header-link'>Add new Quiz-play</NavLink>
            </header>
    )
}

export default Header;