import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getQuestions } from "../services/quiz.service";

interface QuizProviderProps {
  children: ReactNode;
}

interface IAnswer {
  questionId: number;
  answer: string;
  correct_answer: string;
  correct: boolean;
}

interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IQuizContextData {
  numberOfQuestions: number;
  activeQuestionId: number;
  activeQuestion: IQuestion;
  answers: IAnswer[];
  questions: IQuestion[];
  startQuiz: () => Promise<void>;
  resetQuiz: () => Promise<void>;
  answerQuestion: (answer: string) => Promise<void>;
}

const QuizContext = createContext({} as IQuizContextData);

function QuizProvider({ children }: QuizProviderProps) {
  const [activeQuestion, setActiveQuestion] = useState({} as IQuestion);
  const [activeQuestionId, setActiveQuestionId] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([] as IQuestion[]);
  const [answers, setAnswers] = useState([] as IAnswer[]);

  useEffect(() => {
    fetchQuestionsFromAPI();
  }, []);

  async function fetchQuestionsFromAPI() {
    return await getQuestions();
  }

  async function startQuiz() {
    const response = await fetchQuestionsFromAPI();
    setQuestions(response.data.results);
    setActiveQuestionId(0);
    setActiveQuestion(response.data.results[0]);
    setNumberOfQuestions(response.data.results.length);
  }

  async function resetQuiz() {
    setQuestions([]);
    setAnswers([]);
    setActiveQuestionId(0);
    setActiveQuestion({} as IQuestion);
    setNumberOfQuestions(0);
  }

  async function answerQuestion(answer: string) {
    const expectedAnswer = questions[activeQuestionId].correct_answer;
    const answerToSave: IAnswer = {
      answer,
      questionId: activeQuestionId,
      correct: answer === expectedAnswer,
      correct_answer: expectedAnswer,
    };
    setAnswers([...answers, answerToSave]);

    if (activeQuestionId + 1 < numberOfQuestions) {
      setActiveQuestion(questions[activeQuestionId + 1]);
      setActiveQuestionId(activeQuestionId + 1);
    }
  }

  return (
    <QuizContext.Provider
      value={{
        numberOfQuestions,
        activeQuestionId,
        activeQuestion,
        questions,
        answers,
        startQuiz,
        resetQuiz,
        answerQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { QuizProvider, useQuiz };
