import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import VideoEmbed from "../components/common/VideoEmbed";
import DownloadButton from "../components/common/DownloadButton";
import CodeExample from "../components/common/CodeExample";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, FileText, Youtube } from "lucide-react";
import { getCourse } from "../utils/courseStorage";
import { getQuestionsByTopic } from "../utils/questionStorage";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface CodeExampleType {
  title: string;
  code: string;
  language: string;
  explanation: string;
}

interface CourseContent {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
  resources: {
    label: string;
    fileUrl: string;
    fileType: "pdf" | "code" | "notes" | "cheatsheet";
  }[];
  codeExamples?: CodeExampleType[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  banner: string;
  content: CourseContent[];
}

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topicQuestions, setTopicQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (courseId) {
      const courseData = getCourse(courseId);
      setCourse(courseData || null);
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (course && course.content && course.content[activeTopicIndex]) {
      const topicId = course.content[activeTopicIndex].id;
      const questions = getQuestionsByTopic(topicId);
      setTopicQuestions(questions || []);
    }
  }, [course, activeTopicIndex]);

  const activeTopic = course?.content?.[activeTopicIndex];

  const handleStartPracticeTest = () => {
    if (course && activeTopic) {
      // In a real app, this would navigate to a practice test page with the questions
      // For now, show a toast and log the questions to console
      console.log("Starting practice test for:", activeTopic.title);
      console.log("Questions:", topicQuestions);
      
      toast.success(`Started practice test for ${activeTopic.title} with ${topicQuestions.length} questions`);
      
      // Simulate navigation to a test page (you would normally create a TestPage component)
      // navigate(`/test/${courseId}/${activeTopic.id}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Loading...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
            <p>We couldn't find the course you're looking for.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="bg-primary/10 dark:bg-primary/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">{course.description}</p>
        </div>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Course Contents</h3>
              <div className="space-y-2">
                {course.content.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicIndex(index)}
                    className={`flex items-start w-full text-left p-3 rounded-md ${
                      index === activeTopicIndex
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span className="flex-shrink-0 mr-2">
                      {index < activeTopicIndex ? (
                        <CheckCircle size={18} className={index === activeTopicIndex ? "text-white" : "text-green-500"} />
                      ) : (
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                          index === activeTopicIndex 
                            ? "border-white text-white" 
                            : "border-gray-400 text-gray-400 dark:border-gray-500 dark:text-gray-400"
                          }`}>
                          {index + 1}
                        </span>
                      )}
                    </span>
                    <span className={`text-sm ${index === activeTopicIndex ? "font-medium" : ""}`}>
                      {topic.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTopic && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{activeTopic.title}</h2>
                
                <div className="mb-6">
                  <VideoEmbed youtubeId={activeTopic.youtubeId} title={activeTopic.title} />
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Youtube size={16} className="text-red-600 mr-1" />
                    <span>Video Tutorial</span>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p>{activeTopic.description}</p>
                </div>
                
                {activeTopic.codeExamples && activeTopic.codeExamples.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
                    {activeTopic.codeExamples.map((example, index) => (
                      <CodeExample 
                        key={index}
                        title={example.title}
                        code={example.code}
                        language={example.language}
                        explanation={example.explanation}
                      />
                    ))}
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Resources</h3>
                  <div className="flex flex-wrap gap-4">
                    {activeTopic.resources.map((resource, index) => (
                      <DownloadButton
                        key={index}
                        label={resource.label}
                        fileUrl={resource.fileUrl}
                        fileType={resource.fileType}
                      />
                    ))}
                  </div>
                </div>

                {topicQuestions.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Practice Questions</h3>
                    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="mb-2">This topic has {topicQuestions.length} practice questions available.</p>
                      <Button onClick={handleStartPracticeTest}>
                        Start Practice Test
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-6 mt-8 flex justify-between dark:border-slate-700">
                  <button
                    onClick={() => activeTopicIndex > 0 && setActiveTopicIndex(activeTopicIndex - 1)}
                    className={`px-4 py-2 rounded border ${
                      activeTopicIndex === 0 
                        ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-500" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                    disabled={activeTopicIndex === 0}
                  >
                    Previous Lesson
                  </button>
                  
                  <button
                    onClick={() => activeTopicIndex < course.content.length - 1 && setActiveTopicIndex(activeTopicIndex + 1)}
                    className={`px-4 py-2 rounded flex items-center ${
                      activeTopicIndex === course.content.length - 1
                        ? "border border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-700 dark:text-gray-500"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                    disabled={activeTopicIndex === course.content.length - 1}
                  >
                    Next Lesson
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CoursePage;
