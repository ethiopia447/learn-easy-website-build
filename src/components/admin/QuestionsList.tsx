
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, Text, Code, Trash2, Edit } from "lucide-react";
import { Question } from "./TestMaker";
import { deleteQuestion } from "../../utils/questionStorage";
import { toast } from "@/components/ui/sonner";

interface QuestionsListProps {
  questions: Question[];
  onLoadQuestion: (question: Question) => void;
}

const QuestionsList = ({ questions, onLoadQuestion }: QuestionsListProps) => {
  const [filter, setFilter] = useState<string | null>(null);

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      deleteQuestion(id);
      toast.success("Question deleted successfully");
      // Force re-render to refresh the list
      window.location.reload();
    }
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "multipleChoice":
        return <ListOrdered size={16} className="text-blue-500" />;
      case "shortAnswer":
        return <Text size={16} className="text-green-500" />;
      case "codeChallenge":
        return <Code size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "multipleChoice":
        return "Multiple Choice";
      case "shortAnswer":
        return "Short Answer";
      case "codeChallenge":
        return "Code Challenge";
      default:
        return type;
    }
  };

  // Filter questions based on the selected type
  const filteredQuestions = filter
    ? questions.filter(q => q.type === filter)
    : questions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button 
              variant={filter === null ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter(null)}
            >
              All
            </Button>
            <Button 
              variant={filter === "multipleChoice" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("multipleChoice")}
              className="gap-1"
            >
              <ListOrdered size={14} />
              Multiple Choice
            </Button>
            <Button 
              variant={filter === "shortAnswer" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("shortAnswer")}
              className="gap-1"
            >
              <Text size={14} />
              Short Answer
            </Button>
            <Button 
              variant={filter === "codeChallenge" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setFilter("codeChallenge")}
              className="gap-1"
            >
              <Code size={14} />
              Code Challenge
            </Button>
          </div>

          {filteredQuestions.length > 0 ? (
            <div className="space-y-2">
              {filteredQuestions.map(question => (
                <div
                  key={question.id}
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getQuestionIcon(question.type)}
                      <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                        {getQuestionTypeLabel(question.type)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onLoadQuestion(question)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm line-clamp-2">{question.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              {filter ? (
                <p>No {getQuestionTypeLabel(filter)} questions found.</p>
              ) : (
                <p>No questions found. Create your first question!</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionsList;
