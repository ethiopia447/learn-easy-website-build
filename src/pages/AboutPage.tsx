import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
const AboutPage = () => {
  return <>
      <Navbar />
      
      <div className="bg-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">About Geeze</h1>
          <p className="text-lg text-gray-700">
            Learn more about our mission and how to contact us
          </p>
        </div>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">Geeze was created with a simple mission: to make learning programming accessible to everyone. We believe that education should be free, structured, and high-quality.</p>
              <p className="text-gray-700 mb-4">
                Our platform curates the best learning resources available online and organizes them into 
                coherent learning paths. By combining video tutorials, documentation, practice exercises, 
                and downloadable materials, we provide a comprehensive learning experience for beginners 
                and intermediate learners.
              </p>
              <p className="text-gray-700">Whether you're taking your first steps into programming or looking to expand your skills with a new language or technology, Geeze is designed to guide you through that journey efficiently.


Who Am I?
i am natiy and am from ethiopia </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">How Geeze Works</h2>
              <div className="bg-white shadow-sm rounded-lg border p-6">
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">We Curate Quality Content</h3>
                      <p className="text-gray-600">
                        We search the web for the best educational videos, tutorials, 
                        and resources for each programming topic.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">We Organize Learning Paths</h3>
                      <p className="text-gray-600">
                        Content is structured into logical learning sequences, from basic to 
                        advanced concepts, ensuring a smooth learning progression.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">We Create Supplementary Materials</h3>
                      <p className="text-gray-600">
                        We develop cheat sheets, notes, and practice exercises to reinforce learning 
                        and provide quick reference materials.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">You Learn at Your Own Pace</h3>
                      <p className="text-gray-600">
                        Access all materials anytime, allowing you to learn on your own schedule and revisit concepts as needed.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                Have questions, suggestions, or want to contribute to LearnEasy? We'd love to hear from you!
              </p>
              
              <div className="space-y-4">
                <a href="mailto:contact@learneasy.example.com" className="flex items-center text-gray-700 hover:text-primary">
                  <Mail size={20} className="mr-2" />
                  <span>kalikalikalikali1234567@.gmail.com</span>
                </a>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Github size={20} className="mr-2" />
                  <span>github.com/ethiopia447</span>
                </a>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Linkedin size={20} className="mr-2" />
                  <span>linkedin.com/company/learneasy</span>
                </a>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Twitter size={20} className="mr-2" />
                  <span>@learneasy</span>
                </a>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
                <form className="space-y-4">
                  <div>
                    <input type="email" placeholder="Your email address" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <section className="my-12 py-12 border-t">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Become part of a growing community of learners and developers. Share your progress, 
              ask questions, and connect with others on their coding journey.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="flex items-center bg-[#333] text-white px-6 py-3 rounded-md hover:bg-[#24292f] transition-colors">
                <Github size={20} className="mr-2" />
                <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center bg-[#0a66c2] text-white px-6 py-3 rounded-md hover:bg-[#004182] transition-colors">
                <Linkedin size={20} className="mr-2" />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center bg-[#1DA1F2] text-white px-6 py-3 rounded-md hover:bg-[#1a8cd8] transition-colors">
                <Twitter size={20} className="mr-2" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>;
};
export default AboutPage;