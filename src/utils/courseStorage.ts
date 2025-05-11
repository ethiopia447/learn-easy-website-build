
// Function to load courses from localStorage or use default data
export const getCourses = () => {
  const storedCourses = localStorage.getItem('courses');
  if (storedCourses) {
    return JSON.parse(storedCourses);
  }
  
  // Return default courses from the mock data
  const defaultCourses = {
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
          ],
          codeExamples: [
            {
              title: "Hello World in Python",
              code: "# Your first Python program\nprint('Hello, World!')",
              language: "python",
              explanation: "This is a simple Python program that prints 'Hello, World!' to the console.\n- print() is a built-in function that displays output\n- Text strings in Python are enclosed in single or double quotes"
            },
            {
              title: "Variables in Python",
              code: "# Defining variables\nname = 'Alice'\nage = 25\npi = 3.14159\n\n# Using variables\nprint(f'My name is {name} and I am {age} years old.')",
              language: "python",
              explanation: "This example shows how to create and use variables in Python:\n- Variables are created by assigning a value with =\n- Python automatically determines the data type\n- f-strings (formatted string literals) allow you to embed expressions inside string literals using {}"
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
          ],
          codeExamples: [
            {
              title: "Hello World in JavaScript",
              code: "// Your first JavaScript code\nconsole.log('Hello, World!');\n\n// Displaying in the browser\ndocument.getElementById('output').textContent = 'Hello, World!';",
              language: "javascript",
              explanation: "This shows two ways to output text in JavaScript:\n- console.log() outputs text to the browser console (for debugging)\n- The second line finds an HTML element and changes its content"
            },
            {
              title: "Variables in JavaScript",
              code: "// Modern JavaScript variable declaration\nconst name = 'Alice';\nlet age = 25;\n\n// Using template literals\nconsole.log(`My name is ${name} and I am ${age} years old.`);\n\n// Variables can be reassigned (only with let)\nage = 26;\nconsole.log(`Now I am ${age} years old.`);",
              language: "javascript",
              explanation: "This example demonstrates variable usage in JavaScript:\n- const creates variables that cannot be reassigned\n- let creates variables that can be reassigned\n- Template literals use backticks (`) and ${} for embedding variables"
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
          ],
          codeExamples: [
            {
              title: "Basic HTML Document Structure",
              code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My First Webpage</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first webpage.</p>\n</body>\n</html>",
              language: "html",
              explanation: "This shows the essential structure of an HTML document:\n- <!DOCTYPE html> declares the document type\n- <html> is the root element\n- <head> contains meta information and links to external resources\n- <body> contains the visible content of the page"
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
          ],
          codeExamples: [
            {
              title: "Initialize a Git Repository",
              code: "# Create a new repository\ngit init\n\n# Check repository status\ngit status",
              language: "bash",
              explanation: "These commands help you start a new Git repository:\n- git init creates a new Git repository in the current directory\n- git status shows the current state of your repository, including modified files and staging area"
            },
            {
              title: "Basic Git Workflow",
              code: "# Add changes to staging area\ngit add filename.txt\n\n# Add all changes\ngit add .\n\n# Commit changes with a message\ngit commit -m \"Add initial files\"\n\n# View commit history\ngit log",
              language: "bash",
              explanation: "This demonstrates the basic Git workflow:\n- git add stages changes for the next commit\n- git commit saves the staged changes with a descriptive message\n- git log shows the commit history with details like author, date, and message"
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
          ],
          codeExamples: [
            {
              title: "Connect to GitHub",
              code: "# Add a remote repository\ngit remote add origin https://github.com/username/repository.git\n\n# Push your local repository to GitHub\ngit push -u origin main",
              language: "bash",
              explanation: "These commands connect your local repository to GitHub:\n- git remote add creates a connection to a remote repository\n- git push uploads your commits to the remote repository\n- The -u flag sets up tracking, so you can use 'git push' without arguments next time"
            },
            {
              title: "Collaborate with Others",
              code: "# Clone an existing repository\ngit clone https://github.com/username/repository.git\n\n# Pull changes from remote repository\ngit pull origin main\n\n# Create a new branch for your feature\ngit checkout -b feature-name",
              language: "bash",
              explanation: "These commands help you collaborate with others on GitHub:\n- git clone downloads a repository from GitHub to your computer\n- git pull fetches and merges changes from the remote repository\n- git checkout -b creates a new branch for developing features without affecting the main codebase"
            }
          ]
        }
      ]
    }
  };
  
  // Store the default courses in localStorage
  localStorage.setItem('courses', JSON.stringify(defaultCourses));
  
  return defaultCourses;
};

// Function to get a specific course
export const getCourse = (courseId: string) => {
  const courses = getCourses();
  return courses[courseId];
};

// Function to save a course
export const saveCourse = (courseId: string, courseData: any) => {
  const courses = getCourses();
  courses[courseId] = courseData;
  localStorage.setItem('courses', JSON.stringify(courses));
};

// Function to delete a course
export const deleteCourse = (courseId: string) => {
  const courses = getCourses();
  delete courses[courseId];
  localStorage.setItem('courses', JSON.stringify(courses));
};
