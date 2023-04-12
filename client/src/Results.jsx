import React from 'react'

import { useGlobalContext } from "./context";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";

function Results() {
  const {
    index,
    questions,
    questions_answered,
    ToNext,
  } = useGlobalContext();
  /*  
    <button
                    key={index}
                    className={`btn ${iscorrect ? " bg-green-500" : "bg-red-500"} w-full`}>
                    {answer}
                  </button>
  */
  const { answers, correctanswer, question, iscorrect, indexofrightanswer,chosen } = questions_answered[index];
  return (
    <main className="min-h-screen  flex items-center justify-center">
      <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]">
        <div className=' flex items-center justify-between pb-4'>

        <p className={`font-bold ${iscorrect ? "  text-green-500" : "  text-red-500"}`} > {iscorrect ? "Correct Answer" : "Wrong Answer"}</p>
        <p className={`   font-bold ${iscorrect ? "  text-green-500" : "  text-red-500"}`}>
          Number:{" "}
          <span className={`font-bold ${iscorrect ? "  text-green-500" : "  text-red-500"}`}>
            {index + 1}/{questions.length}
          </span>
        </p>
        </div>
        <div className="mt-3">
          <p
            className="text-center font-medium text-2xl lg:text-3xl leading-loose">{question}</p>
          <div className="grid grid-cols-1 my-5 space-y-2 place-content-center">
            {answers.map((answer, index) => {
              return (
                <>
                  {
                  iscorrect && index === indexofrightanswer ? (
                    <button
                      key={index}
                      className="btn bg-green-500   ">{answer}</button>
                  ) : 
                  (
                    !iscorrect && index === chosen ? (
                      <button
                        key={index}
                        className="btn bg-red-500">{answer}</button>
                      ) : (
                        <button
                          key={index}
                          className={`btn ${answer === correctanswer ? " bg-green-500" : ""}`}>{answer}</button>
                        )  
                  )
                  }
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={ToNext}
            className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700"
          >
            Next question
          </button>
        </div>
      </div>
    </main>
  );
}

export default Results