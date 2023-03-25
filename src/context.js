import { useState, useContext, createContext } from "react";

// const table = {
//   sports: 21,
//   history: 23,
//   politics: 24,
//   science: 18,
// };

const API_ENDPOINT = 'http://localhost:3005';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState({});
  const [quiz, setQuiz] = useState({
    amount: 6,
    category: "football",
    difficulty: "easy",
    type: "boolean",
  });

  const fetchApi = async (prompt) => {
    setWaiting(false);
    setLoading(true);
    try {
      // const response = await axios.post(url);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response) {
        const data = await response.json();
        console.log( "data ==>",data.result);
        console.log(data.result.length);
        if (data.result.questions.length > 0) {
          setQuestions(data.result);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      if (prevIndex === questions.length - 1) {
        openModal();
        return questions.length - 1;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prev) => prev + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIndex(0);
    setCorrect(0);
    setWaiting(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty, type } = quiz;
    let prompt = `give me a list of  ${amount}  trivia questions about ${category} with 4 answers at least one is correct 
    and please make the questions very ${difficulty} 
    Put this message in the following JSON structure
    
    {
    "questions":
    [
    {"question":"..", 
    "answers": [],
    "correctanswer":".."
    }
    ]
    }`;
    fetchApi(prompt);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        index,
        questions,
        error,
        correct,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};