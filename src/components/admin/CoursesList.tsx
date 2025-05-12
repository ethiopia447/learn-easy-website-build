
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileEdit, Trash } from "lucide-react";
import { getCourses, deleteCourse } from "../../utils/courseStorage";

interface CoursesListProps {
  onEditCourse: (courseId: string) => void;
}

interface CourseItem {
  id: string;
  title: string;
  description: string;
  contentCount: number;
  level: string;
}

// Define the structure of a course in storage
interface StoredCourse {
  id: string;
  title: string;
  description: string;
  banner?: string;
  content?: Array<any>;
}

const CoursesList = ({ onEditCourse }: CoursesListProps) => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setIsLoading(true);
    const coursesData = getCourses();
    
    const formattedCourses = Object.entries(coursesData).map(([id, course]) => ({
      id,
      title: (course as StoredCourse).title,
      description: (course as StoredCourse).description,
      contentCount: (course as StoredCourse).content?.length || 0,
      level: id === "python" || id === "html-css" ? "beginner" : "intermediate",
    }));
    
    setCourses(formattedCourses);
    setIsLoading(false);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
      loadCourses(); // Refresh the list
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Topics</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                {isLoading ? "Loading courses..." : "No courses found"}
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                <TableCell>{course.contentCount}</TableCell>
                <TableCell>
                  <span className={`py-1 px-2 rounded-full bg-blue-100 text-blue-800 text-xs capitalize`}>
                    {course.level}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEditCourse(course.id)}>
                      <FileEdit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesList;
