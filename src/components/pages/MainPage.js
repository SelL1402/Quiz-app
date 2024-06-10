import Header from "../header/Header";
import QuizList from "../quizList/QuizList";
const MainPage = () => {
    return(
        <>
            <Header/>
            <main className="main">
                <QuizList/>
            </main>
        </>
    )
}

export default MainPage;