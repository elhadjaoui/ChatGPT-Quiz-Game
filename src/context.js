import { useState, useContext, createContext, useRef } from "react";
import { data } from "./db";

// const table = {
//   sports: 21,
//   history: 23,
//   politics: 24,
//   science: 18,
// };

const API_ENDPOINT = 'http://localhost:3005';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const label = useRef()
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading4read, setLoading4read] = useState(false);
  const [loading4listen, setLoading4listen] = useState(false);
  const [read, setRead] = useState(false);
  const [listen, setListen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [audio, setAudio] = useState("");
  const [correct, setCorrect] = useState(0);
  const [resume, setResume] = useState("");
  const [questions, setQuestions] = useState({});
  const [cards, setCards] = useState(data);
  const [quiz, setQuiz] = useState({
    amount: 2,
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
      const data = await response.json();
      if (data) {
        console.log(data.result);
        const result = JSON.parse(data.result);

        if (data.result.length > 0) {
          setQuestions(result);
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
  const fetchApi4Debrief = async (prompt) => {
    setLoading4read(true);
    try {
      // const response = await axios.post(url);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        const {result} = data
        setResume(result);
        setLoading4read(false);
        setError(false);
        setRead(true);
        setListen(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchApi4Listen = async () => {
    console.log("*** = ",resume.slice(0,300));
    setLoading4listen(true);
    try {
      // const response = await axios.post(url);
      fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
        method: 'POST',
        body:  JSON.stringify({
          "text": resume.slice(0,300),
          "voice_settings": {
            "stability": 0,
            "similarity_boost": 0
          }
        },),
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': '94a271361c453711b4f98c8dc3fe431f',
          'accept': 'audio/mpeg' 
         
        }
      }).then(response => response.blob()).then(blob => {
        const audioUrl = window.URL.createObjectURL(new Blob([blob]));
        console.log(audioUrl.slice(5));
        const audio = new Audio(audioUrl);
        audio.play();
        setAudio(audioUrl.slice(5));
      });
      // setLoading4listen(false);
      // setAudio(response)
    
      // if (data) {
      //   console.log(data);
      //   const {result} = data
      //   setResume(result);
      //   setLoading4listen(false);
      //   setError(false);
      // } else {
      //   setError(true);
      // }
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
    let prompt;
    type === "multiple" ?
      prompt = `give me a list of  ${amount} very ${difficulty} trivia questions about ${category} with 4 answers at least one is correct 
    Put this message in the following JSON structure
    
    [
    {"question":"..", 
    "answers": [],
    "correctanswer":".."
    }
    ]
    ` :

      prompt = `give me a list of  ${amount} very ${difficulty} trivia questions about ${category} with true or flase answers at least one is correct
    Put this message in the following JSON structure
    
    [
    {"question":"..", 
    "answers": [],
    "correctanswer":".."
    }
    ]
    `
      ;
    fetchApi(prompt);
  };
  const ReadSumbit = (prompt) => {
    fetchApi4Debrief(prompt);
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        loading4read,
        loading4listen,
        index,
        resume,
        label,
        questions,
        error,
        correct,
        read,
        audio,
        listen,
        cards,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        quiz,
        handleChange,
        setCards,
        ReadSumbit,
        handleSubmit,
        fetchApi4Listen,
        setRead,
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
