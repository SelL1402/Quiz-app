import './quizListItem.scss'
import { Link } from 'react-router-dom';
const QuizListItem = ({id, title, theme, time, amount}) => {
    return(
        <Link to={`/${id}`}>
            <div className="quizItem-content">
                <div className="quizItem-content-text">
                    <h1 className="quizItem-content-text-title">{title}</h1>
                    <h3 className="quizItem-content-text-theme">{theme}</h3>
                </div>
                <div className="quizItem-content-info">
                    <div className="quizItem-content-info-amount">{amount} quistions</div>
                    <div className="quizItem-content-info-time">{time}min</div>
                </div>
            </div>
        </Link>
    )
}

export default QuizListItem;