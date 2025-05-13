
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Plus, Trash, X, ListOrdered, Search, Filter } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TestMaker, { Question } from "./TestMaker";
import { addSampleTestQuestions, getQuestionsByTopic } from "../../utils/questionStorage";
import { toast } from "@/components/ui/sonner";
import CodeEditor from "./CodeEditor";

interface ContentItemFormProps {
  content: any;
  isActive: boolean;
  onToggle: () => void;
  onChange: (content: any) => void;
  onDelete: () => void;
  index: number;
}

const ContentItemForm = ({
  content,
  isActive,
  onToggle,
  onChange,
  onDelete,
  index
}: ContentItemFormProps) => {
  const [codeExamples, setCodeExamples] = useState(content.codeExamples || []);
  const [resources, setResources] = useState(content.resources || []);
  const [questions, setQuestions] = useState(content.questions || getQuestionsByTopic(content.id) || []);
  const [showTestMaker, setShowTestMaker] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  const addCodeExample = () => {
    const newCodeExample = {
      title: "New Code Example",
      code: "// Add your code here",
      language: "javascript",
      explanation: "Add an explanation of the code here"
    };
    
    const updatedExamples = [...codeExamples, newCodeExample];
    setCodeExamples(updatedExamples);
    
    onChange({
      ...content,
      codeExamples: updatedExamples
    });
  };

  const updateCodeExample = (index: number, field: string, value: string) => {
    const updated = [...codeExamples];
    updated[index] = { ...updated[index], [field]: value };
    setCodeExamples(updated);
    
    onChange({
      ...content,
      codeExamples: updated
    });
  };

  const deleteCodeExample = (index: number) => {
    const updated = codeExamples.filter((_, i) => i !== index);
    setCodeExamples(updated);
    
    onChange({
      ...content,
      codeExamples: updated
    });
  };

  const addResource = () => {
    const newResource = {
      label: "New Resource",
      fileUrl: "#",
      fileType: "pdf" as "pdf" | "code" | "notes" | "cheatsheet"
    };
    
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    
    onChange({
      ...content,
      resources: updatedResources
    });
  };

  const updateResource = (index: number, field: string, value: string) => {
    const updated = [...resources];
    updated[index] = { ...updated[index], [field]: value };
    setResources(updated);
    
    onChange({
      ...content,
      resources: updated
    });
  };

  const deleteResource = (index: number) => {
    const updated = resources.filter((_, i) => i !== index);
    setResources(updated);
    
    onChange({
      ...content,
      resources: updated
    });
  };

  const handleQuestionsAdded = (newQuestions: Question[]) => {
    // Make sure we have the latest questions from the topic
    const topicQuestions = getQuestionsByTopic(content.id);
    
    setQuestions(topicQuestions);
    
    onChange({
      ...content,
      questions: topicQuestions
    });
    
    toast.success(`${newQuestions.length} question(s) added successfully!`);
  };

  // Function to add sample test questions
  const handleAddSampleQuestions = () => {
    // Add sample questions with the current courseId and topicId
    addSampleTestQuestions(content.courseId, content.id);
    
    // Get questions for this topic
    const topicQuestions = getQuestionsByTopic(content.id);
    setQuestions(topicQuestions);
    
    onChange({
      ...content,
      questions: topicQuestions
    });
    
    toast.success("Sample questions added successfully!");
  };

  return (
    <div className="border rounded-md dark:border-slate-800">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${
          isActive ? "bg-gray-50 dark:bg-slate-800" : "bg-white dark:bg-slate-900"
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
            {index + 1}
          </div>
          <h4 className="font-medium">{content.title || "Untitled Topic"}</h4>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash size={16} />
          </Button>
          {isActive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
      
      {isActive && (
        <div className="p-4 border-t dark:border-slate-800">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={content.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Topic title"
                className="dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">YouTube Video ID</label>
              <Input
                value={content.youtubeId || ""}
                onChange={(e) => handleInputChange("youtubeId", e.target.value)}
                placeholder="e.g. dQw4w9WgXcQ"
                className="dark:bg-slate-800 dark:border-slate-700"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                The ID part of a YouTube URL (e.g., youtube.com/watch?v=dQw4w9WgXcQ)
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={content.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Description of this topic"
                rows={3}
                className="dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="resources" className="border-slate-200 dark:border-slate-700">
                <AccordionTrigger className="py-2">
                  Resources ({resources.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {resources.map((resource: any, idx: number) => (
                      <div key={idx} className="border rounded-md p-3 relative dark:border-slate-700">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => deleteResource(idx)}
                        >
                          <X size={14} />
                        </Button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Label</label>
                            <Input
                              size={1}
                              value={resource.label}
                              onChange={(e) => updateResource(idx, "label", e.target.value)}
                              className="dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium mb-1 block">File URL</label>
                            <Input
                              size={1}
                              value={resource.fileUrl}
                              onChange={(e) => updateResource(idx, "fileUrl", e.target.value)}
                              className="dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium mb-1 block">File Type</label>
                            <select
                              className="w-full border rounded-md h-10 px-3 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                              value={resource.fileType}
                              onChange={(e) => updateResource(idx, "fileType", e.target.value)}
                            >
                              <option value="pdf">PDF</option>
                              <option value="code">Code</option>
                              <option value="notes">Notes</option>
                              <option value="cheatsheet">Cheatsheet</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addResource}
                      className="w-full mt-2 gap-2"
                    >
                      <Plus size={14} /> Add Resource
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="codeExamples" className="border-slate-200 dark:border-slate-700">
                <AccordionTrigger className="py-2">
                  Code Examples ({codeExamples.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {codeExamples.map((example: any, idx: number) => (
                      <div key={idx} className="border rounded-md p-3 relative dark:border-slate-700">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => deleteCodeExample(idx)}
                        >
                          <X size={14} />
                        </Button>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Title</label>
                            <Input
                              value={example.title}
                              onChange={(e) => updateCodeExample(idx, "title", e.target.value)}
                              className="dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium mb-1 block">Language</label>
                            <select
                              className="w-full border rounded-md h-10 px-3 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                              value={example.language}
                              onChange={(e) => updateCodeExample(idx, "language", e.target.value)}
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="python">Python</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="bash">Bash</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium mb-1 block">Code</label>
                            <CodeEditor 
                              value={example.code}
                              language={example.language} 
                              onChange={(code) => updateCodeExample(idx, "code", code)}
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium mb-1 block">Explanation</label>
                            <Textarea
                              value={example.explanation}
                              onChange={(e) => updateCodeExample(idx, "explanation", e.target.value)}
                              rows={4}
                              className="dark:bg-slate-800 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCodeExample}
                      className="w-full mt-2 gap-2"
                    >
                      <Plus size={14} /> Add Code Example
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="questions" className="border-slate-200 dark:border-slate-700">
                <AccordionTrigger className="py-2">
                  Test Questions ({questions.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {questions.length > 0 && (
                      <div className="border rounded-md p-3 mb-4 dark:border-slate-700">
                        <p className="text-sm font-medium mb-2">Added Questions ({questions.length})</p>
                        <ul className="text-sm space-y-1">
                          {questions.map((q: Question, idx: number) => (
                            <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
                              <span className="truncate">{q.text}</span>
                              <span className="text-xs text-gray-500 ml-2">{q.type}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddSampleQuestions}
                        className="gap-2"
                      >
                        <ListOrdered size={16} /> Add Sample Questions
                      </Button>
                    </div>
                    
                    {showTestMaker ? (
                      <div>
                        <TestMaker 
                          courseId={content.courseId}
                          topicId={content.id}
                          onQuestionsAdded={handleQuestionsAdded}
                          embedded={true}
                        />
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowTestMaker(false)}
                          className="w-full mt-4"
                        >
                          Hide Question Editor
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTestMaker(true)}
                        className="w-full gap-2"
                      >
                        <Plus size={14} /> Add Test Question
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentItemForm;
