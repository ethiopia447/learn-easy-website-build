
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ListOrdered } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionsList from "./QuestionsList";
import CodeEditor from "./CodeEditor";
import { toast } from "@/components/ui/sonner";
import { saveQuestion, getQuestions, saveMultipleQuestions, addSampleTestQuestions } from "../../utils/questionStorage";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([
    { id: `o-${Date.now()}-1`, text: "", isCorrect: false },
    { id: `o-${Date.now()}-2`, text: "", isCorrect: false },
    { id: `o-${Date.now()}-3`, text: "", isCorrect: false },
    { id: `o-${Date.now()}-4`, text: "", isCorrect: false }
  ]);
  const [codeSnippet, setCodeSnippet] = useState<string>("// Write your code here");
  const [codeLanguage, setCodeLanguage] = useState<string>("javascript");
  const [explanation, setExplanation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Update questions when the list changes
  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  const resetForm = () => {
    setQuestionText("");
    setAnswer("");
    setOptions([
      { id: `o-${Date.now()}-1`, text: "", isCorrect: false },
      { id: `o-${Date.now()}-2`, text: "", isCorrect: false },
      { id: `o-${Date.now()}-3`, text: "", isCorrect: false },
      { id: `o-${Date.now()}-4`, text: "", isCorrect: false }
    ]);
    setCodeSnippet("// Write your code here");
    setCodeLanguage("javascript");
    setExplanation("");
  };

  const handleOptionTextChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (optionId: string) => {
    const updatedOptions = options.map(option => ({
      ...option,
      isCorrect: option.id === optionId
    }));
    setOptions(updatedOptions);
  };

  const handleSaveQuestion = () => {
    // Validate question data
    if (!questionText.trim()) {
      toast.error("Question text cannot be empty");
      return;
    }

    if (activeTab === "multipleChoice") {
      if (!options.some(o => o.text.trim())) {
        toast.error("At least one option must have text");
        return;
      }
      
      if (!options.some(o => o.isCorrect)) {
        toast.error("Please select a correct option");
        return;
      }
    }

    if ((activeTab === "shortAnswer" || activeTab === "codeChallenge") && !answer.trim()) {
      toast.error("Answer cannot be empty");
      return;
    }

    // Create question object
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      type: activeTab,
      text: questionText,
      courseId,
      topicId,
    };

    // Add type-specific data
    if (activeTab === "multipleChoice") {
      newQuestion.options = options;
    } else if (activeTab === "shortAnswer") {
      newQuestion.answer = answer;
      if (explanation) newQuestion.explanation = explanation;
    } else if (activeTab === "codeChallenge") {
      newQuestion.answer = answer;
      newQuestion.codeSnippet = codeSnippet;
      newQuestion.codeLanguage = codeLanguage;
      if (explanation) newQuestion.explanation = explanation;
    }
    
    // Save question
    saveQuestion(newQuestion);
    
    // If we're in embedded mode and have a callback, call it
    if (embedded && onQuestionsAdded) {
      onQuestionsAdded([newQuestion]);
    }
    
    // Update questions list and reset form
    setQuestions(getQuestions());
    resetForm();
    
    toast.success("Question saved successfully!");
  };

  const handleLoadQuestion = (question: Question) => {
    setActiveTab(question.type);
    setQuestionText(question.text);
    
    if (question.type === "multipleChoice" && question.options) {
      setOptions(question.options);
    } else if (question.type === "shortAnswer" || question.type === "codeChallenge") {
      setAnswer(question.answer || "");
    }
    
    if (question.type === "codeChallenge") {
      setCodeSnippet(question.codeSnippet || "// Write your code here");
      setCodeLanguage(question.codeLanguage || "javascript");
    }
    
    setExplanation(question.explanation || "");
  };

  const handleAddSampleQuestions = () => {
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

  // Filter questions
  const filteredQuestions = questions
    .filter(question => {
      if (filterType === "all") return true;
      return question.type === filterType;
    })
    .filter(question => {
      if (!searchTerm) return true;
      return (
        question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.explanation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{embedded ? "Create Test Questions" : "Test Maker"}</h2>
          <p className="text-gray-600 dark:text-gray-400">Create questions and exercises for your courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddSampleQuestions} className="gap-2">
            <ListOrdered size={16} /> Add Sample Questions
          </Button>
        </div>
      </div>
      
      <div className={`grid grid-cols-1 ${embedded ? "" : "lg:grid-cols-3"} gap-6`}>
        {/* Question Editor */}
        <div className={embedded ? "" : "lg:col-span-2"}>
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Question Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="question-type">Question Type:</Label>
                  <div className="mt-2">
                    <select
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value as QuestionType)}
                      className="w-full border rounded-md h-10 px-3 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                      <option value="multipleChoice">Multiple Choice</option>
                      <option value="shortAnswer">Short Answer</option>
                      <option value="codeChallenge">Code Challenge</option>
                    </select>
                  </div>
                </div>
                
                {/* Question Text - Always shown */}
                <div className="space-y-2">
                  <Label htmlFor="question-text" className="text-lg font-medium">Question:</Label>
                  <Textarea 
                    id="question-text"
                    placeholder="Enter your question here..."
                    className="font-normal dark:bg-slate-800 dark:border-slate-700"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    rows={3}
                  />
                </div>

                {activeTab === "multipleChoice" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Answer Options:</Label>
                    
                    <RadioGroup 
                      value={options.find(o => o.isCorrect)?.id || ""} 
                      onValueChange={handleCorrectOptionChange}
                      className="space-y-3"
                    >
                      {options.map((option, index) => (
                        <div key={option.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Input 
                            id={`option-${option.id}`}
                            value={option.text}
                            onChange={(e) => handleOptionTextChange(index, e.target.value)}
                            placeholder={`Choice ${index + 1}`}
                            className="flex-grow dark:bg-slate-800 dark:border-slate-700"
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                
                {(activeTab === "shortAnswer" || activeTab === "codeChallenge") && (
                  <div className="space-y-2">
                    <Label htmlFor="correct-answer" className="text-lg font-medium">Answer:</Label>
                    <Textarea 
                      id="correct-answer"
                      placeholder="Enter the correct answer..."
                      className="font-normal dark:bg-slate-800 dark:border-slate-700"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
                
                {activeTab === "codeChallenge" && (
                  <>
                    <div>
                      <Label htmlFor="code-language" className="font-medium">Language:</Label>
                      <select
                        id="code-language"
                        className="w-full border rounded-md h-10 px-3 text-sm mt-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={codeLanguage}
                        onChange={(e) => setCodeLanguage(e.target.value)}
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
                      <Label htmlFor="code-snippet" className="font-medium">Code Snippet:</Label>
                      <div className="mt-1 border rounded-md overflow-hidden dark:border-slate-700">
                        <CodeEditor
                          value={codeSnippet}
                          language={codeLanguage}
                          onChange={setCodeSnippet}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {(activeTab === "shortAnswer" || activeTab === "codeChallenge") && (
                  <div className="space-y-2">
                    <Label htmlFor="explanation" className="font-medium">Explanation (Optional):</Label>
                    <Textarea 
                      id="explanation"
                      placeholder="Explain the answer..."
                      className="font-normal dark:bg-slate-800 dark:border-slate-700"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      rows={2}
                    />
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveQuestion} className="gap-2">
                    <Save size={16} /> Save Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Questions List - Only show when not in embedded mode */}
        {!embedded && (
          <div className="lg:col-span-1">
            <Card className="dark:bg-slate-900 dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Questions List</CardTitle>
                <div className="mt-2 space-y-2">
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dark:bg-slate-800 dark:border-slate-700"
                  />
                  <select
                    className="w-full border rounded-md h-10 px-3 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="shortAnswer">Short Answer</option>
                    <option value="codeChallenge">Code Challenge</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                <QuestionsList 
                  questions={filteredQuestions} 
                  onLoadQuestion={handleLoadQuestion} 
                  useFilters={false}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestMaker;
