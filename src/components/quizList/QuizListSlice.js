import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    quizList : {}
};

const quizListSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz(state, action) {
            state.quizList = action.payload;
        },
        removeQuiz(state) {
            state.quizList = null;
        }
    }
})

export const {setQuiz, removeQuiz} = quizListSlice.actions;

export default quizListSlice.reducer;