import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Trash2, 
  Save,
  ListOrdered,
  Text as TextIcon,
  Code,
  Square,
  CheckCircle2,
  FileCode2 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionsList from "./QuestionsList";
import CodeEditor from "./CodeEditor";
import { toast } from "@/components/ui/sonner";
import { saveQuestion, getQuestions, saveMultipleQuestions } from "../../utils/questionStorage";

export type QuestionType = "multipleChoice" | "shortAnswer" | "codeChallenge";

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  courseId?: string;
  topicId?: string;
  options?: Option[];
  answer?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  explanation?: string;
}

interface TestMakerProps {
  courseId?: string;
  topicId?: string;
  onQuestionsAdded?: (questions: Question[]) => void;
  embedded?: boolean;
}

const TestMaker = ({ courseId, topicId, onQuestionsAdded, embedded = false }: TestMakerProps) => {
  const [activeTab, setActiveTab] = useState<QuestionType>("multipleChoice");
  const [questions, setQuestions] = useState<Question[]>(getQuestions());
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: `q-${Date.now()}`,
    type: "multipleChoice",
    courseId,
    topicId,
    text: "",
    options: [
      { id: `o-${Date.now()}-1`, text: "", isCorrect: false },
      { id: `o-${Date.now()}-2`, text: "", isCorrect: false },
    ]
  });
  
  // Update questions when the courseId or topicId changes
  useEffect(() => {
    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      courseId,
      topicId
    }));
  }, [courseId, topicId]);

  const handleQuestionTypeChange = (type: QuestionType) => {
    setActiveTab(type);
    setCurrentQuestion({
      ...currentQuestion,
      type,
      options: type === "multipleChoice" 
        ? [
            { id: `o-${Date.now()}-1`, text: "", isCorrect: false },
            { id: `o-${Date.now()}-2`, text: "", isCorrect: false }
          ] 
        : undefined,
      answer: type === "shortAnswer" ? "" : undefined,
      codeSnippet: type === "codeChallenge" ? "// Write your code here" : undefined,
      codeLanguage: type === "codeChallenge" ? "javascript" : undefined,
    });
  };

  const handleQuestionTextChange = (text: string) => {
    setCurrentQuestion({ ...currentQuestion, text });
  };

  const handleAnswerChange = (answer: string) => {
    setCurrentQuestion({ ...currentQuestion, answer });
  };

  const handleCodeChange = (code: string) => {
    setCurrentQuestion({ ...currentQuestion, codeSnippet: code });
  };

  const handleExplanationChange = (explanation: string) => {
    setCurrentQuestion({ ...currentQuestion, explanation });
  };

  const handleLanguageChange = (language: string) => {
    setCurrentQuestion({ ...currentQuestion, codeLanguage: language });
  };

  const handleOptionTextChange = (optionId: string, text: string) => {
    const updatedOptions = currentQuestion.options?.map(option => 
      option.id === optionId ? { ...option, text } : option
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleCorrectOptionChange = (optionId: string) => {
    const updatedOptions = currentQuestion.options?.map(option => 
      ({ ...option, isCorrect: option.id === optionId })
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    if (!currentQuestion.options || currentQuestion.options.length >= 6) return;
    
    const newOption = {
      id: `o-${Date.now()}`,
      text: "",
      isCorrect: false
    };
    
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, newOption]
    });
  };

  const handleRemoveOption = (optionId: string) => {
    if (!currentQuestion.options || currentQuestion.options.length <= 2) return;
    
    const updatedOptions = currentQuestion.options.filter(option => option.id !== optionId);
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  // Function to handle form submission when Enter key is pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only prevent default behavior for Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      // Focus the next appropriate field based on question type
      if (currentQuestion.type === "multipleChoice" && currentQuestion.options && currentQuestion.options.length > 0) {
        // Focus first option
        const firstOptionInput = document.getElementById(`option-${currentQuestion.options[0].id}`);
        if (firstOptionInput) {
          firstOptionInput.focus();
        }
      } else if (currentQuestion.type === "shortAnswer") {
        // Focus the answer textarea
        const answerInput = document.getElementById("correct-answer");
        if (answerInput) {
          answerInput.focus();
        }
      } else if (currentQuestion.type === "codeChallenge") {
        // Focus the expected solution
        const solutionInput = document.getElementById("expected-solution");
        if (solutionInput) {
          solutionInput.focus();
        }
      }
    }
  };

  // Function to handle the form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveQuestion();
  };

  const handleSaveQuestion = () => {
    // Validate question data
    if (!currentQuestion.text.trim()) {
      toast.error("Question text cannot be empty");
      return;
    }

    if (currentQuestion.type === "multipleChoice") {
      if (!currentQuestion.options?.some(o => o.text.trim())) {
        toast.error("At least one option must have text");
        return;
      }
      
      if (!currentQuestion.options?.some(o => o.isCorrect)) {
        toast.error("Please select a correct option");
        return;
      }
    }

    if (currentQuestion.type === "shortAnswer" && !currentQuestion.answer?.trim()) {
      toast.error("Answer cannot be empty");
      return;
    }

    if (currentQuestion.type === "codeChallenge") {
      if (!currentQuestion.codeSnippet?.trim()) {
        toast.error("Code snippet cannot be empty");
        return;
      }
      
      if (!currentQuestion.answer?.trim()) {
        toast.error("Expected output/solution cannot be empty");
        return;
      }
    }

    // Save question
    const questionToSave = {
      ...currentQuestion,
      id: `q-${Date.now()}`, // Generate new ID for the question
      courseId, // Ensure courseId is set
      topicId  // Ensure topicId is set
    };
    
    saveQuestion(questionToSave);
    
    // If we're in embedded mode and have a callback, call it
    if (embedded && onQuestionsAdded) {
      onQuestionsAdded([questionToSave]);
    }
    
    // Update questions list
    const updatedQuestions = getQuestions();
    setQuestions(updatedQuestions);
    
    // Reset form
    setCurrentQuestion({
      id: `q-${Date.now()}`,
      type: activeTab,
      courseId,
      topicId,
      text: "",
      options: activeTab === "multipleChoice" 
        ? [
            { id: `o-${Date.now()}-1`, text: "", isCorrect: false },
            { id: `o-${Date.now()}-2`, text: "", isCorrect: false }
          ] 
        : undefined,
      answer: activeTab === "shortAnswer" || activeTab === "codeChallenge" ? "" : undefined,
      codeSnippet: activeTab === "codeChallenge" ? "// Write your code here" : undefined,
      codeLanguage: activeTab === "codeChallenge" ? "javascript" : undefined,
    });
    
    toast.success("Question saved successfully!");
  };

  const handleLoadQuestion = (question: Question) => {
    setActiveTab(question.type);
    setCurrentQuestion(question);
  };

  // Function to add sample test questions
  const handleAddSampleQuestions = () => {
    const { addSampleTestQuestions, getQuestions } = require('../../utils/questionStorage');
    
    // Add sample questions with the current courseId and topicId
    addSampleTestQuestions(courseId, topicId);
    
    // Update questions list
    const updatedQuestions = getQuestions();
    setQuestions(updatedQuestions);
    
    // If we're in embedded mode and have a callback, call it with the new questions
    if (embedded && onQuestionsAdded) {
      const newQuestions = updatedQuestions.filter(q => 
        q.courseId === courseId && q.topicId === topicId
      );
      onQuestionsAdded(newQuestions);
    }
    
    toast.success("Sample questions added successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{embedded ? "Create Test Questions" : "Test Maker"}</h2>
          <p className="text-gray-600">Create questions and exercises for your courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddSampleQuestions} className="gap-2">
            <ListOrdered size={16} /> Add Sample Questions
          </Button>
          <Button onClick={handleSaveQuestion} className="gap-2">
            <Save size={16} /> Save Question
          </Button>
        </div>
      </div>
      
      <div className={`grid grid-cols-1 ${embedded ? "" : "lg:grid-cols-3"} gap-6`}>
        {/* Question Editor */}
        <div className={embedded ? "" : "lg:col-span-2"}>
          <Card>
            <CardHeader>
              <CardTitle>Question Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="question-type">Question Type</Label>
                  <Tabs value={activeTab} onValueChange={(val) => handleQuestionTypeChange(val as QuestionType)} className="mt-2">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="multipleChoice" className="gap-2">
                        <ListOrdered size={16} /> Multiple Choice
                      </TabsTrigger>
                      <TabsTrigger value="shortAnswer" className="gap-2">
                        <TextIcon size={16} /> Short Answer
                      </TabsTrigger>
                      <TabsTrigger value="codeChallenge" className="gap-2">
                        <Code size={16} /> Code Challenge
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Question Text - Always shown */}
                <div className="p-4 border rounded-md bg-gray-50">
                  <Label htmlFor="question-text" className="text-lg font-medium mb-2 block">Question</Label>
                  <Textarea 
                    id="question-text"
                    placeholder="Enter your question here..."
                    className="mt-1"
                    value={currentQuestion.text}
                    onChange={(e) => handleQuestionTextChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                  />
                </div>

                <TabsContent value="multipleChoice" className="mt-4 p-0 border-0">
                  <div className="p-4 border rounded-md bg-white shadow-sm space-y-4">
                    <Label className="text-lg font-medium">Answer Options</Label>
                    
                    <RadioGroup 
                      value={currentQuestion.options?.find(o => o.isCorrect)?.id || ""} 
                      onValueChange={handleCorrectOptionChange}
                      className="space-y-3"
                    >
                      {currentQuestion.options?.map((option, index) => (
                        <div key={option.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-50">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Input 
                            id={`option-${option.id}`}
                            value={option.text}
                            onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-grow"
                          />
                          {currentQuestion.options && currentQuestion.options.length > 2 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="px-2"
                              onClick={() => handleRemoveOption(option.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {currentQuestion.options && currentQuestion.options.length < 6 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddOption}
                        className="gap-2"
                      >
                        <PlusCircle size={14} /> Add Option
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="shortAnswer" className="mt-4 p-0 border-0">
                  <div className="p-4 border rounded-md bg-white shadow-sm space-y-4">
                    <div>
                      <Label htmlFor="correct-answer" className="text-lg font-medium block mb-2">Correct Answer</Label>
                      <Textarea 
                        id="correct-answer"
                        placeholder="Enter the correct answer..."
                        className="mt-1 font-mono"
                        value={currentQuestion.answer || ""}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="explanation" className="font-medium block mb-1">Explanation (Optional)</Label>
                      <Textarea 
                        id="explanation"
                        placeholder="Explain the answer..."
                        className="mt-1"
                        value={currentQuestion.explanation || ""}
                        onChange={(e) => handleExplanationChange(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="codeChallenge" className="mt-4 p-0 border-0">
                  <div className="p-4 border rounded-md bg-white shadow-sm space-y-4">
                    <div>
                      <Label htmlFor="code-language" className="font-medium block mb-1">Language</Label>
                      <select
                        id="code-language"
                        className="w-full border rounded-md h-10 px-3 text-sm mt-1"
                        value={currentQuestion.codeLanguage || "javascript"}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="typescript">TypeScript</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="code-snippet" className="font-medium block mb-1">Code Snippet</Label>
                      <div className="mt-1 border rounded-md overflow-hidden">
                        <CodeEditor
                          value={currentQuestion.codeSnippet || "// Write your code here"}
                          language={currentQuestion.codeLanguage || "javascript"}
                          onChange={handleCodeChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="expected-solution" className="text-lg font-medium block mb-2">Expected Solution/Output</Label>
                      <Textarea 
                        id="expected-solution"
                        placeholder="Enter the expected solution or output..."
                        className="mt-1 font-mono"
                        value={currentQuestion.answer || ""}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="code-explanation" className="font-medium block mb-1">Explanation (Optional)</Label>
                      <Textarea 
                        id="code-explanation"
                        placeholder="Explain the solution..."
                        className="mt-1"
                        value={currentQuestion.explanation || ""}
                        onChange={(e) => handleExplanationChange(e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <div className="flex justify-end">
                  <Button type="submit" className="gap-2">
                    <Save size={16} /> Save Question
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Questions List - Only show when not in embedded mode */}
        {!embedded && (
          <div className="lg:col-span-1">
            <QuestionsList questions={questions} onLoadQuestion={handleLoadQuestion} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestMaker;
