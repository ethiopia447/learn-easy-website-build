
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
  if (!topicId) return [];
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

// Add sample test questions
export const addSampleTestQuestions = (courseId?: string, topicId?: string): void => {
  if (!topicId) return;
  
  const timestamp = Date.now();
  
  const sampleQuestions: Question[] = [
    // Multiple Choice Questions
    {
      id: `q-${timestamp}-1`,
      type: "multipleChoice",
      courseId,
      topicId,
      text: "What is the correct way to declare a variable in JavaScript?",
      options: [
        { id: `o-${timestamp}-1-1`, text: "var x = 5;", isCorrect: false },
        { id: `o-${timestamp}-1-2`, text: "let x = 5;", isCorrect: true },
        { id: `o-${timestamp}-1-3`, text: "const x = 5;", isCorrect: false },
        { id: `o-${timestamp}-1-4`, text: "int x = 5;", isCorrect: false }
      ],
      explanation: "While both var, let, and const are valid, let is the modern preferred way to declare variables that will be reassigned."
    },
    {
      id: `q-${timestamp}-2`,
      type: "multipleChoice",
      courseId,
      topicId,
      text: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: `o-${timestamp}-2-1`, text: "String", isCorrect: false },
        { id: `o-${timestamp}-2-2`, text: "Boolean", isCorrect: false },
        { id: `o-${timestamp}-2-3`, text: "Integer", isCorrect: true },
        { id: `o-${timestamp}-2-4`, text: "Object", isCorrect: false }
      ],
      explanation: "JavaScript has Number type, not specifically Integer and Float types like some other languages."
    },
    
    // Short Answer Questions
    {
      id: `q-${timestamp}-3`,
      type: "shortAnswer",
      courseId,
      topicId,
      text: "What function is used to print content to the console in JavaScript?",
      answer: "console.log()",
      explanation: "console.log() is used to output content to the browser's developer console for debugging purposes."
    },
    {
      id: `q-${timestamp}-4`,
      type: "shortAnswer",
      courseId,
      topicId,
      text: "What does DOM stand for in web development?",
      answer: "Document Object Model",
      explanation: "The DOM is a programming interface for web documents that represents the structure of a document as a tree of objects."
    },
    
    // Code Challenge Questions
    {
      id: `q-${timestamp}-5`,
      type: "codeChallenge",
      courseId,
      topicId,
      text: "Write a function that returns the sum of two numbers.",
      codeSnippet: "function add(a, b) {\n  // Write your code here\n}",
      codeLanguage: "javascript",
      answer: "function add(a, b) {\n  return a + b;\n}",
      explanation: "This function takes two parameters and returns their sum using the + operator."
    },
    {
      id: `q-${timestamp}-6`,
      type: "codeChallenge",
      courseId,
      topicId,
      text: "Create a function that checks if a number is even.",
      codeSnippet: "function isEven(num) {\n  // Write your code here\n}",
      codeLanguage: "javascript",
      answer: "function isEven(num) {\n  return num % 2 === 0;\n}",
      explanation: "This function checks if a number is even by using the modulo operator to see if there's a remainder when divided by 2."
    }
  ];
  
  saveMultipleQuestions(sampleQuestions);
};
