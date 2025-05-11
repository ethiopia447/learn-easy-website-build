
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import VideoEmbed from "../components/common/VideoEmbed";
import DownloadButton from "../components/common/DownloadButton";
import { useState } from "react";
import { ArrowRight, CheckCircle, FileText, Youtube } from "lucide-react";

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
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  // Mock courses data - in a real app this would come from an API
  const courses: Record<string, Course> = {
    "python": {
      id: "python",
      title: "Python Fundamentals",
      description: "Learn Python from scratch with this comprehensive course. Perfect for beginners with no prior programming experience.",
      banner: "photo-1461749280684-dccba630e2f6",
      content: [
        {
          id: "getting-started",
          title: "Getting Started with Python",
          youtubeId: "kqtD5dpn9C8",
          description: "In this introduction to Python, you'll learn how to install Python and write your first Python program.",
          resources: [
            {
              label: "Python Installation Guide",
              fileUrl: "#",
              fileType: "pdf"
            },
            {
              label: "First Program Notes",
              fileUrl: "#",
              fileType: "notes"
            }
          ]
        },
        {
          id: "variables",
          title: "Variables and Data Types",
          youtubeId: "cQT33yu9pY8",
          description: "Learn about different data types in Python and how to use variables effectively.",
          resources: [
            {
              label: "Data Types Cheatsheet",
              fileUrl: "#",
              fileType: "cheatsheet"
            },
            {
              label: "Example Code",
              fileUrl: "#",
              fileType: "code"
            }
          ]
        },
        {
          id: "control-flow",
          title: "Control Flow: If Statements and Loops",
          youtubeId: "Dh-UdKk8lDY",
          description: "Master conditional statements and loops to control the flow of your Python programs.",
          resources: [
            {
              label: "Control Flow Exercises",
              fileUrl: "#",
              fileType: "pdf"
            }
          ]
        }
      ]
    },
    "javascript": {
      id: "javascript",
      title: "JavaScript Essentials",
      description: "Master the language of the web with this comprehensive JavaScript course.",
      banner: "photo-1498050108023-c5249f4df085",
      content: [
        {
          id: "js-basics",
          title: "JavaScript Basics",
          youtubeId: "W6NZfCO5SIk",
          description: "An introduction to JavaScript syntax, variables, and basic concepts.",
          resources: [
            {
              label: "JavaScript Fundamentals",
              fileUrl: "#",
              fileType: "pdf"
            }
          ]
        },
        {
          id: "dom-manipulation",
          title: "DOM Manipulation",
          youtubeId: "5fb2aPlgoys",
          description: "Learn how to interact with HTML elements using JavaScript.",
          resources: [
            {
              label: "DOM Cheatsheet",
              fileUrl: "#",
              fileType: "cheatsheet"
            }
          ]
        }
      ]
    },
    "html-css": {
      id: "html-css",
      title: "HTML & CSS Basics",
      description: "Create your first website with these fundamental web technologies.",
      banner: "photo-1486312338219-ce68d2c6f44d",
      content: [
        {
          id: "html-structure",
          title: "HTML Document Structure",
          youtubeId: "qz0aGYrrlhU",
          description: "Learn the basic structure of an HTML document and essential tags.",
          resources: [
            {
              label: "HTML Tags Reference",
              fileUrl: "#",
              fileType: "pdf"
            }
          ]
        },
        {
          id: "css-basics",
          title: "CSS Styling Basics",
          youtubeId: "1Rs2ND1ryYc",
          description: "Style your HTML pages with CSS properties and selectors.",
          resources: [
            {
              label: "CSS Cheatsheet",
              fileUrl: "#",
              fileType: "cheatsheet"
            }
          ]
        }
      ]
    },
    "git": {
      id: "git",
      title: "Git & Version Control",
      description: "Learn how to effectively track changes and collaborate on code projects.",
      banner: "photo-1518770660439-4636190af475",
      content: [
        {
          id: "git-basics",
          title: "Git Basics",
          youtubeId: "8JJ101D3knE",
          description: "Understand Git concepts and basic commands.",
          resources: [
            {
              label: "Git Command Reference",
              fileUrl: "#",
              fileType: "pdf"
            }
          ]
        },
        {
          id: "github",
          title: "Working with GitHub",
          youtubeId: "RGOj5yH7evk",
          description: "Learn how to use GitHub for remote repositories and collaboration.",
          resources: [
            {
              label: "GitHub Workflow",
              fileUrl: "#",
              fileType: "pdf"
            }
          ]
        }
      ]
    }
  };

  const course = courses[courseId || "python"];
  const activeTopic = course?.content[activeTopicIndex];

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
      
      <div className="bg-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-lg text-gray-700 max-w-3xl">{course.description}</p>
        </div>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Course Contents</h3>
              <div className="space-y-2">
                {course.content.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicIndex(index)}
                    className={`flex items-start w-full text-left p-3 rounded-md ${
                      index === activeTopicIndex
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex-shrink-0 mr-2">
                      {index < activeTopicIndex ? (
                        <CheckCircle size={18} className={index === activeTopicIndex ? "text-white" : "text-green-500"} />
                      ) : (
                        <span className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                          index === activeTopicIndex 
                            ? "border-white text-white" 
                            : "border-gray-400 text-gray-400"
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
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Youtube size={16} className="text-red-600 mr-1" />
                    <span>Video Tutorial</span>
                  </div>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p>{activeTopic.description}</p>
                </div>
                
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
                
                <div className="border-t pt-6 mt-8 flex justify-between">
                  <button
                    onClick={() => activeTopicIndex > 0 && setActiveTopicIndex(activeTopicIndex - 1)}
                    className={`px-4 py-2 rounded border ${
                      activeTopicIndex === 0 
                        ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    disabled={activeTopicIndex === 0}
                  >
                    Previous Lesson
                  </button>
                  
                  <button
                    onClick={() => activeTopicIndex < course.content.length - 1 && setActiveTopicIndex(activeTopicIndex + 1)}
                    className={`px-4 py-2 rounded flex items-center ${
                      activeTopicIndex === course.content.length - 1
                        ? "border border-gray-200 text-gray-400 cursor-not-allowed"
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
