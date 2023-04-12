import React from 'react'

import { useGlobalContext } from "./context";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";
import Results from './Results';

function Quizz() {
  const {
    waiting,
    loading,
    index,
    questions,
    nextQuestion,
    checkAnswer,
    showResults,
    questions_answered
  } = useGlobalContext();
// console.log(questions_answered);
  if (showResults) {
    return <Results />;
  }

  if (waiting) {
    return <Form />;
  }
  if (loading) {
    return <Loading />;
  }
console.log(questions);
  const { answers, correctanswer, question } = questions[index];

  return (
    <main className="min-h-screen  flex items-center justify-center">
      <Modal />
      <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]">
        <p className="text-right pb-2 text-green-600">
          Number:{" "}
          <span>
            {index + 1}/{questions.length}
          </span>
        </p>
        <div className="mt-3">
          <p
            className="text-center font-medium text-2xl lg:text-3xl leading-loose">{question}</p>
          <div className="grid grid-cols-1 my-5 space-y-2 place-content-center">
            {answers.map((answer, index) => {
              return (
                <button onClick={() => checkAnswer(answer === correctanswer, index)}
                  key={index}
                  className="bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-blue-400">{answer}</button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={nextQuestion}
            className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700"
          >
            Next question
          </button>
        </div>
      </div>
    </main>
  );
}

export default Quizz