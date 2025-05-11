
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { getCourse, saveCourse } from "../../utils/courseStorage";
import ContentItemForm from "./ContentItemForm";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface CourseFormProps {
  mode: "add" | "edit";
  courseId?: string;
  onCancel: () => void;
  onSave: () => void;
}

const courseFormSchema = z.object({
  id: z.string().min(3, "ID must be at least 3 characters"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.string().optional(),
});

const CourseForm = ({ mode, courseId, onCancel, onSave }: CourseFormProps) => {
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [activeContent, setActiveContent] = useState<number | null>(null);

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      banner: "photo-1498050108023-c5249f4df085", // default banner
    }
  });

  useEffect(() => {
    if (mode === "edit" && courseId) {
      const course = getCourse(courseId);
      if (course) {
        form.reset({
          id: courseId,
          title: course.title,
          description: course.description,
          banner: course.banner || "photo-1498050108023-c5249f4df085",
        });
        setContentItems(course.content || []);
      }
    }
  }, [mode, courseId, form]);

  const handleAddContent = () => {
    const newContent = {
      id: `content-${Date.now()}`,
      title: "New Topic",
      youtubeId: "",
      description: "Description for this topic",
      resources: [],
      codeExamples: []
    };
    
    setContentItems([...contentItems, newContent]);
    setActiveContent(contentItems.length);
  };

  const handleContentChange = (index: number, content: any) => {
    const newItems = [...contentItems];
    newItems[index] = content;
    setContentItems(newItems);
  };

  const handleDeleteContent = (index: number) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      const newItems = [...contentItems];
      newItems.splice(index, 1);
      setContentItems(newItems);
      setActiveContent(null);
    }
  };

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    try {
      const courseData = {
        id: values.id,
        title: values.title,
        description: values.description,
        banner: values.banner || "photo-1498050108023-c5249f4df085",
        content: contentItems
      };
      
      saveCourse(values.id, courseData);
      toast.success("Course saved successfully!");
      onSave();
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. javascript" 
                      {...field} 
                      disabled={mode === "edit"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. JavaScript Essentials" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter a description of the course..." 
                    className="min-h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image ID (from unsplash.com)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. photo-1498050108023-c5249f4df085" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Course Content</h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddContent}
                className="gap-2"
              >
                <PlusCircle size={16} />
                Add Topic
              </Button>
            </div>
            
            {contentItems.length === 0 ? (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-gray-500">No content items yet. Click "Add Topic" to create your first topic.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contentItems.map((content, index) => (
                  <ContentItemForm
                    key={index}
                    content={content}
                    isActive={activeContent === index}
                    onToggle={() => setActiveContent(activeContent === index ? null : index)}
                    onChange={(updatedContent) => handleContentChange(index, updatedContent)}
                    onDelete={() => handleDeleteContent(index)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Create Course" : "Update Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
