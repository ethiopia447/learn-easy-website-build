
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileEdit, Book, LogOut, TestTube } from "lucide-react";
import CoursesList from "../components/admin/CoursesList";
import CourseForm from "../components/admin/CourseForm";
import TestMaker from "../components/admin/TestMaker";
import { logoutUser } from "../utils/firebase";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "../contexts/AuthContext";

const AdminPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingCourse(null);
  };

  const handleEditCourse = (courseId: string) => {
    setIsAdding(false);
    setEditingCourse(courseId);
  };

  const handleCancelEdit = () => {
    setIsAdding(false);
    setEditingCourse(null);
  };

  const handleFinishEdit = () => {
    setIsAdding(false);
    setEditingCourse(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">Manage your courses and resources</p>
            {currentUser && (
              <p className="text-sm text-blue-600">Logged in as: {currentUser.email}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            {!isAdding && !editingCourse && (
              <Button onClick={handleAddNew} className="gap-2">
                <PlusCircle size={16} /> Add New Course
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="courses" className="mb-10">
          <TabsList>
            <TabsTrigger value="courses" className="gap-2">
              <Book size={16} /> Courses
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <TestTube size={16} /> Tests
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <FileEdit size={16} /> Resources
            </TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="mt-6">
            {isAdding ? (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
                <CourseForm mode="add" onCancel={handleCancelEdit} onSave={handleFinishEdit} />
              </div>
            ) : editingCourse ? (
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
                <CourseForm 
                  mode="edit" 
                  courseId={editingCourse}
                  onCancel={handleCancelEdit}
                  onSave={handleFinishEdit}
                />
              </div>
            ) : (
              <CoursesList onEditCourse={handleEditCourse} />
            )}
          </TabsContent>
          <TabsContent value="tests" className="mt-6">
            <TestMaker />
          </TabsContent>
          <TabsContent value="resources" className="mt-6">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-bold mb-4">Resources Management</h2>
              <p className="text-gray-600 mb-4">This feature will be available soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default AdminPage;
