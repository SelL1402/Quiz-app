import QuizListItem from "../quizListItem/QuizListitem";
import {useGetQuizQuery} from "../../api/apiSlice"

import './QuizList.scss'
const QuizList = () => {
    const {
        data: quiz = []
    } = useGetQuizQuery();

    const renderList = (arr) => {
        return arr.map(({id, ...props}) => {
            return(
                <QuizListItem key={id} {...{id, ...props}}/>
            )
        })
    }
    const elements = renderList(quiz);
    return(
        <ul className="quizList">
            {elements}
        </ul>
    )
}

export default QuizList;