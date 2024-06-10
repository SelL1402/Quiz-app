import { MainPage, TestPage, NewQuiz } from "../pages";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path='/:testId' element={<TestPage/>}/>
          <Route path="/newQuiz" element={<NewQuiz/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
