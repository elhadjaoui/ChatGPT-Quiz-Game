import { useGlobalContext } from "../context";

const Form = () => {
  const { quiz, handleSubmit, handleChange, error } = useGlobalContext();
  return (
    <div className="justify-center flex items-center min-h-screen  w-full">
          <ShowPrompt />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 md:p-8 max-w-[500px] space-y-8 shadow rounded-lg w-11/12 "
      >
        <h2 className="text-3xl font-medium">Setup Quiz</h2>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium" htmlFor="amount">
            Number of Questions
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
            value={quiz.amount}
            onChange={handleChange}
            min={2}
            max={6}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium" htmlFor="category">
            Select Topic
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
            value={quiz.category}
            onChange={handleChange}

          >
            <option value="football">football</option>
            <option value="fc barcelona">fc barcelona</option>
            <option value="real madrid">real madrid</option>
            <option value="fcb vs rma">fcb vs rma</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium" htmlFor="difficulty">
            Select Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
            value={quiz.difficulty}
            onChange={handleChange}

          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium" htmlFor="type">
            Select Type
          </label>
          <select
            id="type"
            name="type"
            className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
            value={quiz.type}
            onChange={handleChange}

          >
            <option value="multiple">multiple choice</option>
            <option value="boolean">true or false</option>

          </select>
        </div>
        {error && (
          <p className="text-red-600">
            Can't Generate Questions, Please Try Different Options
          </p>
        )}
        <button
          type="submit"
          className=" btn w-full bg-green-700"
        >
          Start
        </button>
        <label htmlFor="show-prompt" className="btn w-full bg-green-700">Show Prompt</label>
      </form>
    </div>
  );
};

export const ShowPrompt = () => {
  const { quiz } = useGlobalContext();
  const { amount, category, difficulty, type } = quiz;
  let prompt;

    prompt = `give me a list of  ${amount} very ${difficulty} trivia questions about ${category} with 4 answers at least one is correct 
  Put this message in the following JSON structure
  
  [
  {"question":"..", 
  "answers": [],
  "correctanswer":".."
  }
  ]`;
  return (
    <div>
      <input type="checkbox" id="show-prompt" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Prompt Used</h3>
          <p className="py-4 text-">{prompt}</p>
          <div className="modal-action">
            <label htmlFor="show-prompt" className="btn bg-green-700">Close</label>
          </div>
        </div>
      </div>
    </div>
  );
};


  export default Form;
