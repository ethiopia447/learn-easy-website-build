
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeExample from "./CodeExample";
import { Question } from "../admin/TestMaker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

interface StudentQuestionViewProps {
  question: Question;
}

const StudentQuestionView = ({ question }: StudentQuestionViewProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption("");
    setAnswer("");
    setIsChecked(false);
    setShowAnswer(false);
    setIsCorrect(null);
  }, [question.id]);

  const handleCheckAnswer = () => {
    if (question.type === "multipleChoice") {
      const correctOption = question.options?.find(o => o.isCorrect);
      setIsCorrect(selectedOption === correctOption?.id);
    } else if (question.type === "shortAnswer" || question.type === "codeChallenge") {
      // Simple check - this could be enhanced with more sophisticated matching
      const normalizedUserAnswer = answer.trim().toLowerCase();
      const normalizedCorrectAnswer = question.answer?.trim().toLowerCase() || "";
      setIsCorrect(normalizedUserAnswer === normalizedCorrectAnswer);
    }
    setIsChecked(true);
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case "multipleChoice":
        return (
          <div className="space-y-4">
            <p className="text-lg">{question.text}</p>
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              disabled={isChecked}
            >
              {question.options?.map(option => (
                <div key={option.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label 
                    htmlFor={option.id} 
                    className={
                      isChecked && option.isCorrect 
                        ? "text-green-600 font-medium" 
                        : isChecked && selectedOption === option.id && !option.isCorrect 
                        ? "text-red-600" 
                        : ""
                    }
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "shortAnswer":
        return (
          <div className="space-y-4">
            <p className="text-lg">{question.text}</p>
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isChecked}
              rows={3}
            />
            {isChecked && showAnswer && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium text-green-800">Correct answer:</p>
                <p className="mt-1">{question.answer}</p>
                {question.explanation && (
                  <>
                    <p className="font-medium text-green-800 mt-2">Explanation:</p>
                    <p className="mt-1">{question.explanation}</p>
                  </>
                )}
              </div>
            )}
          </div>
        );

      case "codeChallenge":
        return (
          <div className="space-y-4">
            <p className="text-lg">{question.text}</p>
            
            {question.codeSnippet && (
              <CodeExample
                title="Code Challenge"
                code={question.codeSnippet}
                language={question.codeLanguage || "javascript"}
              />
            )}
            
            <div>
              <Label>Your Answer/Solution:</Label>
              <Textarea
                placeholder="Type your solution here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isChecked}
                rows={4}
                className="font-mono"
              />
            </div>
            
            {isChecked && showAnswer && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium text-green-800">Expected answer:</p>
                <pre className="mt-1 bg-white p-2 rounded overflow-x-auto font-mono text-sm">
                  {question.answer}
                </pre>
                {question.explanation && (
                  <>
                    <p className="font-medium text-green-800 mt-2">Explanation:</p>
                    <p className="mt-1">{question.explanation}</p>
                  </>
                )}
              </div>
            )}
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {renderQuestion()}
        
        <div className="flex flex-wrap gap-3 justify-between mt-6">
          <div className="flex gap-2">
            {!isChecked && (
              <Button onClick={handleCheckAnswer}>Check Answer</Button>
            )}
            {isChecked && (question.type === "shortAnswer" || question.type === "codeChallenge") && (
              <Button variant="outline" onClick={toggleShowAnswer} className="gap-2">
                {showAnswer ? (
                  <>
                    <EyeOff size={16} /> Hide Answer
                  </>
                ) : (
                  <>
                    <Eye size={16} /> Show Answer
                  </>
                )}
              </Button>
            )}
          </div>
          
          {isChecked && isCorrect !== null && (
            <div className={`px-4 py-2 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentQuestionView;
