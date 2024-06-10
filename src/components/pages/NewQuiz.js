import Header from "../header/Header";
import AddQuiz from "../AddQuiz/AddQuiz";
const NewQuiz = () =>{
    return(
        <>
            <Header/>
            <main className="main">
                <AddQuiz/>
            </main>
        </>
    )
}

export default NewQuiz;