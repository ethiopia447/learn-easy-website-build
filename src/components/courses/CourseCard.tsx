
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  level: CourseLevel;
  topicCount: number;
}

const CourseCard = ({ title, description, image, slug, level, topicCount }: CourseCardProps) => {
  return (
    <div className="course-card bg-white border rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <img 
          src={`https://images.unsplash.com/${image}`} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold mb-0">{title}</h3>
          <div className={`difficulty-${level}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{topicCount} topics</span>
          <Link 
            to={`/course/${slug}`}
            className="text-primary hover:text-primary-600 flex items-center text-sm font-medium"
          >
            <span>Start Learning</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
