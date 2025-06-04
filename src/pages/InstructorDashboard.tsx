import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, DollarSign, Users, Star, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Course } from '@/components/course/CourseCard';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    videoFile: null as File | null
  });

  useEffect(() => {
    // Mock instructor courses
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete React Developer Course',
        description: 'Learn React from scratch and build amazing web applications',
        instructor: user?.name || 'Instructor',
        price: 89.99,
        originalPrice: 149.99,
        rating: 4.8,
        students: 15420,
        duration: '40 hours',
        image: '/placeholder.svg',
        category: 'Web Development',
        level: 'Intermediate'
      }
    ];
    setCourses(mockCourses);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: user?.name || 'Instructor',
      price: formData.price,
      rating: 0,
      students: 0,
      duration: '0 hours',
      image: '/placeholder.svg',
      category: formData.category,
      level: formData.level
    };

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...newCourse, id: editingCourse.id } : c));
      setEditingCourse(null);
    } else {
      setCourses([...courses, newCourse]);
    }

    setFormData({ title: '', description: '', price: 0, category: '', level: 'Beginner', videoFile: null });
    setShowCreateForm(false);
  };

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      level: course.level,
      videoFile: null
    });
    setEditingCourse(course);
    setShowCreateForm(true);
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const totalEarnings = courses.reduce((sum, course) => sum + (course.price * course.students), 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create/Edit Course Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingCourse ? 'Edit Course' : 'Create New Course'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' })}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                {/* Video Upload Section */}
                <div>
                  <Label htmlFor="video">Course Video</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="video-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> course video
                          </p>
                          <p className="text-xs text-gray-500">MP4, AVI, MOV (MAX. 500MB)</p>
                          {formData.videoFile && (
                            <p className="text-xs text-green-600 mt-2">
                              Selected: {formData.videoFile.name}
                            </p>
                          )}
                        </div>
                        <input 
                          id="video-upload" 
                          type="file" 
                          className="hidden" 
                          accept="video/*"
                          onChange={handleVideoUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingCourse(null);
                      setFormData({ title: '', description: '', price: 0, category: '', level: 'Beginner', videoFile: null });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Courses List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex space-x-6 text-sm text-gray-500">
                        <span>{course.students} students</span>
                        <span>${course.price}</span>
                        <span>{course.rating} ⭐</span>
                        <span>{course.category}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
