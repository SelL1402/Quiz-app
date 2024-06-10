import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useCreateQuizMutation } from '../../api/apiSlice';

import './AddQuiz.scss';

const AddQuiz = () => {
    const [createQuiz] = useCreateQuizMutation();
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: uuidv4(), question: `question${questions.length + 1}`, correctAnswer: `correctAnswer${questions.length + 1}`, variants: [] }
        ]);
    };

    const deleteQuestion = () => {
        setQuestions(questions.slice(0, -1));
    };

    const addVariantToQuestion = (questionId) => {
        setQuestions(questions.map(question => 
            question.id === questionId ? 
            { ...question, variants: [...question.variants, { id: uuidv4(), name: `variant${question.variants.length + 1}` }] } : 
            question
        ));
    };

    const deleteVariantFromQuestion = (questionId) => {
        setQuestions(questions.map(question => 
            question.id === questionId ? 
            { ...question, variants: question.variants.slice(0, -1) } : 
            question
        ));
    };

    const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div className='newQuiz-content'>
                <label htmlFor={props.id || props.name} className='newQuiz-label'>{label}</label>
                <input {...field} {...props} className='newQuiz-input' />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    return (
        <Formik
            initialValues={{
                title: '',
                time: 0,
                questions: []
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .min(2, "Minimum 2 characters")
                    .required('Obligatory field!'),
                time: Yup.number()
                    .min(5, 'At least 5 minutes')
                    .required('Obligatory field!'),
            })}
            onSubmit={values => createQuiz(values)}
        >
            <Form className='newQuiz'>
                <h2>Create a new quiz</h2>
                <MyTextInput
                    label="Name of the test"
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                />
                <MyTextInput
                    label="Time (minutes)"
                    id="time"
                    name="time"
                    type="number"
                    autoComplete="off"
                />
                {questions.map((question, qIndex) => (
                    <div key={question.id} className='question-block'>
                        <MyTextInput
                            label={`Question ${qIndex + 1}`}
                            id={question.question}
                            name={`questions[${qIndex}].question`}
                            type="text"
                            autoComplete="off"
                        />
                        <MyTextInput
                            label={`Correct Answer for Question ${qIndex + 1}`}
                            id={question.correctAnswer}
                            name={`questions[${qIndex}].correctAnswer`}
                            type="text"
                            autoComplete="off"
                        />
                        {question.variants.map((variant, vIndex) => (
                            <MyTextInput
                                key={variant.id}
                                label={`Variant ${vIndex + 1}`}
                                id={variant.name}
                                name={`questions[${qIndex}].variants[${vIndex}]`}
                                type="text"
                                autoComplete="off"
                            />
                        ))}
                        <div className="newQuiz-buttons">
                            <button type="button" className='newQuiz-btn' onClick={() => addVariantToQuestion(question.id)}>Add answers</button>
                            <button type="button" className='newQuiz-btn' onClick={() => deleteVariantFromQuestion(question.id)}>Delete answer</button>
                        </div>
                    </div>
                ))}
                <div className="newQuiz-buttons">
                    <button type="button" className='newQuiz-btn' onClick={addQuestion}>Add question</button>
                    <button type="button" className='newQuiz-btn' onClick={deleteQuestion}>Delete question</button>
                </div>
                <button type="submit" className='newQuiz-submit'>Submit</button>
            </Form>
        </Formik>
    );
};

export default AddQuiz;
