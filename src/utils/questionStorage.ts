
import { Question } from "../components/admin/TestMaker";

// Save a question to localStorage
export const saveQuestion = (question: Question): void => {
  const questions = getQuestions();
  
  // Check if question already exists (for editing)
  const existingIndex = questions.findIndex(q => q.id === question.id);
  
  if (existingIndex >= 0) {
    // Update existing question
    questions[existingIndex] = question;
  } else {
    // Add new question
    questions.push(question);
  }
  
  localStorage.setItem("course_questions", JSON.stringify(questions));
};

// Get all questions from localStorage
export const getQuestions = (): Question[] => {
  const questionsJson = localStorage.getItem("course_questions");
  return questionsJson ? JSON.parse(questionsJson) : [];
};

// Get a specific question by ID
export const getQuestion = (id: string): Question | undefined => {
  const questions = getQuestions();
  return questions.find(q => q.id === id);
};

// Delete a question by ID
export const deleteQuestion = (id: string): void => {
  const questions = getQuestions();
  const updatedQuestions = questions.filter(q => q.id !== id);
  localStorage.setItem("course_questions", JSON.stringify(updatedQuestions));
};

// Get questions for a specific course
export const getQuestionsByCourse = (courseId: string): Question[] => {
  const questions = getQuestions();
  return questions.filter(q => q.courseId === courseId);
};

// Get questions for a specific topic
export const getQuestionsByTopic = (topicId: string): Question[] => {
  const questions = getQuestions();
  return questions.filter(q => q.topicId === topicId);
};

// Save multiple questions at once
export const saveMultipleQuestions = (questions: Question[]): void => {
  const existingQuestions = getQuestions();
  
  // For each new question, check if it exists and update or add
  questions.forEach(newQuestion => {
    const existingIndex = existingQuestions.findIndex(q => q.id === newQuestion.id);
    
    if (existingIndex >= 0) {
      existingQuestions[existingIndex] = newQuestion;
    } else {
      existingQuestions.push(newQuestion);
    }
  });
  
  localStorage.setItem("course_questions", JSON.stringify(existingQuestions));
};
