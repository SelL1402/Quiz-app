import { useParams } from "react-router-dom";
import { useGetTestQuery } from '../../api/apiSlice';
import Carousel from 'react-bootstrap/Carousel';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect, useRef } from 'react';

import './quistions.scss';

const Questions = () => {
    const { itemId } = useParams();
    const { data: test = [], error, isLoading } = useGetTestQuery(itemId);

    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimeOver, setTimeOver] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (test && test.length > 0 && typeof test[0].time === 'number') {
            const totalSeconds = test[0].time * 60; // convert minutes to seconds
            setTimeLeft(totalSeconds);
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        if (!alertShown) {
                            setTimeOver(true);
                            clearInterval(timer);
                            if (formRef.current) {
                                formRef.current.handleSubmit();
                            }
                        }
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [test, alertShown]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading data</div>;
    }

    if (!Array.isArray(test) || test.length === 0) {
        console.log("No data available");
        return <div>No data available</div>;
    }

    const [arr] = test;

    if (!arr || typeof arr !== 'object') {
        console.error("Data is not an object or is undefined", arr);
        return <div>Error loading data</div>;
    }

    const { questions } = arr;

    const validationSchema = Yup.object({
        answers: Yup.array()
            .of(Yup.string().required('*Answer required'))
            .length(questions.length, '*All questions must be answered')
    });

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            <Formik
                innerRef={formRef}
                initialValues={{
                    answers: new Array(questions.length).fill('')
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const score = values.answers.reduce((acc, answer, index) => {
                        if (answer === questions[index].correctAnswer) {
                            acc += 1;
                        }
                        return acc;
                    }, 0);

                    if (!alertShown) {
                        alert(`Time is over! Your score: ${score} out of ${questions.length}`);
                        setAlertShown(true);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <Carousel slide={false} className="carousel" interval={null}>
                            {questions.map((q, index) => (
                                <Carousel.Item key={index}>
                                    <h2>{q.question}</h2>
                                    {q.variants.map((answer, i) => (
                                        <div key={i}>
                                            <label className="variants">
                                                <Field type="radio" name={`answers[${index}]`} value={answer}/>
                                                {answer}
                                            </label>
                                        </div>
                                    ))}
                                    <ErrorMessage name={`answers[${index}]`} component="div" className="error"/>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <button type="submit" disabled={isSubmitting || isTimeOver} className="submit-btn">
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Questions;
