import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CourseCard from "../components/courses/CourseCard";
import { ArrowRight, BookText, FileCheck, CalendarClock } from "lucide-react";
import { getCourses } from "../utils/courseStorage";
const Index = () => {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    // Get courses from localStorage
    const coursesData = getCourses();

    // Transform the data for the CourseCard component
    const formattedCourses = Object.entries(coursesData).map(([id, course]: [string, any]) => ({
      title: course.title,
      description: course.description,
      image: course.banner,
      slug: id,
      level: id === "python" || id === "html-css" ? "beginner" : "intermediate",
      topicCount: course.content?.length || 0
    }));
    setCourses(formattedCourses);
  }, []);
  return <>
      <Navbar />

      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-white">
                Learn to code with<br />
                <span className="text-purple-200">structured resources</span>
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mb-8">
                Free, organized learning paths with the best videos, documentation, and practice exercises to help you master coding skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/course/python" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-900 bg-black hover:bg-gray-50">
                  Start Learning
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link to="/resources" className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10">
                  Browse Resources
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-5/12">
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 z-10 absolute top-4 left-4">
                  <pre className="text-xs text-gray-800">
                    <code>
                    {`def hello_world():
    print("Hello, World!")
    
hello_world()`}
                    </code>
                  </pre>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-2 z-20 relative">
                  <pre className="text-xs text-gray-800">
                    <code>
                    {`function calculateArea(width, height) {
  return width * height;
}

const area = calculateArea(5, 10);
console.log(area); // 50`}
                    </code>
                  </pre>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-1 z-30 absolute bottom-4 right-4">
                  <pre className="text-xs text-gray-800">
                    <code>
                    {`<div class="container">
  <h1>Welcome to LearnEasy</h1>
  <p>Start your coding journey today!</p>
</div>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        <section className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Explore Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated learning paths with hand-picked resources to help you master programming skills efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course: any) => <CourseCard key={course.slug} title={course.title} description={course.description} image={course.image} slug={course.slug} level={course.level as "beginner" | "intermediate" | "advanced"} topicCount={course.topicCount} />)}
          </div>
        </section>

        <section className="section-container bg-gray-50 -mx-4 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Why Learn with Us?</h2>
            <p className="text-gray-600">
              Our platform is designed to provide you with the best learning experience possible.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookText size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">
                Content organized into logical sequences, from basic to advanced, making it easy to progress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileCheck size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Resources</h3>
              <p className="text-gray-600">
                Curated videos, notes, and exercises selected to provide the most effective learning experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CalendarClock size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
              <p className="text-gray-600">
                Access materials anytime, allowing you to learn at your own pace and on your own schedule.
              </p>
            </div>
          </div>
        </section>

        <section className="section-container">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:p-12 md:w-3/5">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to start your coding journey?</h2>
                <p className="text-white/80 mb-6">
                  Access all our courses, resources, and learning materials for free.
                </p>
                <Link to="/course/python" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-900 bg-white hover:bg-gray-50">
                  Get Started Now
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="hidden md:block md:w-2/5">
                <div className="h-full bg-white/10 flex items-center justify-center p-6">
                  <div className="bg-white/90 p-2 rounded-lg transform rotate-3">
                    <pre className="text-xs text-gray-800">
                      <code>
                      {`# Your coding journey starts here
class Developer:
    def __init__(self):
        self.skills = []
        self.learning = True
    
    def learn(self, skill):
        self.skills.append(skill)
        return "New skill acquired!"

me = Developer()
me.learn("Python")`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>;
};
export default Index;