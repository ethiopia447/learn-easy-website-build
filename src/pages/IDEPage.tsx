
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CodeIDE from "../components/ide/CodeIDE";
import { ThemeToggle } from "../components/layout/ThemeToggle";

const IDEPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Online Code IDE</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Write, test, and run your code right in the browser
            </p>
          </div>
          <ThemeToggle />
        </div>
        
        <p className="mb-6">
          Use this online IDE to experiment with code, test concepts, and practice programming.
          Currently supporting JavaScript, HTML, and simulated Python execution.
        </p>
        
        <div className="mt-8">
          <CodeIDE />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IDEPage;
