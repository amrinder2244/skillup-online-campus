import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, DollarSign, Users, Star, Upload, Video, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Course } from '@/components/course/CourseCard';

interface CourseSection {
  id: string;
  title: string;
  videos: CourseVideo[];
}

interface CourseVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: File | null;
  videoFile: File | null;
  feedback: { thumbsUp: number; thumbsDown: number };
}

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    thumbnail: null as File | null,
    prerequisites: '',
    sectionsCount: 1,
    flexibleVideos: false
  });
  const [courseSections, setCourseSections] = useState<CourseSection[]>([]);
  const [selectedCourseForVideos, setSelectedCourseForVideos] = useState<string | null>(null);

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

  const handleEdit = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      level: course.level,
      thumbnail: null,
      prerequisites: '',
      sectionsCount: 1,
      flexibleVideos: false
    });
    setEditingCourse(course);
    setShowCreateForm(true);
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const totalEarnings = courses.reduce((sum, course) => sum + (course.price * course.students), 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);

  const handleCreateCourse = () => {
    setShowCreateForm(true);
    setCurrentStep(1);
    setFormData({ 
      title: '', 
      description: '', 
      price: 0, 
      category: '', 
      level: 'Beginner', 
      thumbnail: null,
      prerequisites: '',
      sectionsCount: 1,
      flexibleVideos: false
    });
    setCourseSections([]);
  };

  const handleSubmitBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Initialize sections based on count
      const sections: CourseSection[] = [];
      for (let i = 0; i < formData.sectionsCount; i++) {
        sections.push({
          id: `section-${i + 1}`,
          title: `Section ${i + 1}`,
          videos: []
        });
      }
      setCourseSections(sections);
      setCurrentStep(2);
    }
  };

  const handleFinalizeCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: user?.name || 'Instructor',
      price: formData.price,
      rating: 0,
      students: 0,
      duration: '0 hours',
      image: formData.thumbnail ? URL.createObjectURL(formData.thumbnail) : '/placeholder.svg',
      category: formData.category,
      level: formData.level
    };

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...newCourse, id: editingCourse.id } : c));
      setEditingCourse(null);
    } else {
      setCourses([...courses, newCourse]);
    }

    setShowCreateForm(false);
    setCurrentStep(1);
    setCourseSections([]);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
    }
  };

  const addVideoToSection = (sectionId: string) => {
    const newVideo: CourseVideo = {
      id: `video-${Date.now()}`,
      title: '',
      duration: '',
      thumbnail: null,
      videoFile: null,
      feedback: { thumbsUp: 0, thumbsDown: 0 }
    };

    setCourseSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, videos: [...section.videos, newVideo] }
          : section
      )
    );
  };

  const updateVideo = (sectionId: string, videoId: string, updates: Partial<CourseVideo>) => {
    setCourseSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              videos: section.videos.map(video =>
                video.id === videoId ? { ...video, ...updates } : video
              )
            }
          : section
      )
    );
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setCourseSections(sections =>
      sections.map(section =>
        section.id === sectionId ? { ...section, title } : section
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <Button onClick={handleCreateCourse}>
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

        {/* Create Course Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 ? 'Create New Course - Basic Information' : 'Create New Course - Course Structure'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? (
                <form onSubmit={handleSubmitBasicInfo} className="space-y-6">
                  {/* Course Thumbnail */}
                  <div>
                    <Label htmlFor="thumbnail">Course Thumbnail</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="thumbnail-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> course thumbnail
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                            {formData.thumbnail && (
                              <p className="text-xs text-green-600 mt-2">
                                Selected: {formData.thumbnail.name}
                              </p>
                            )}
                          </div>
                          <input 
                            id="thumbnail-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter course title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter detailed course description"
                      className="h-24"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="prerequisites">Course Prerequisites</Label>
                    <Textarea
                      id="prerequisites"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                      placeholder="List any prerequisites for this course (e.g., basic HTML knowledge, JavaScript fundamentals)"
                      className="h-20"
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
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g., Web Development"
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

                  <div>
                    <Label htmlFor="sectionsCount">Number of Course Sections</Label>
                    <Input
                      id="sectionsCount"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.sectionsCount}
                      onChange={(e) => setFormData({ ...formData, sectionsCount: Number(e.target.value) })}
                      placeholder="How many sections will this course have?"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="flexibleVideos"
                      type="checkbox"
                      checked={formData.flexibleVideos}
                      onChange={(e) => setFormData({ ...formData, flexibleVideos: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="flexibleVideos">
                      I'm not sure about the exact number of videos per section (I'll add them flexibly)
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Continue to Course Structure
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Course Structure</h3>
                    <p className="text-gray-600 mb-4">
                      Configure your course sections and add videos. You can add videos now or later.
                    </p>
                  </div>

                  {courseSections.map((section, index) => (
                    <Card key={section.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Label htmlFor={`section-title-${section.id}`}>Section {index + 1} Title</Label>
                            <Input
                              id={`section-title-${section.id}`}
                              value={section.title}
                              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                              placeholder={`Enter title for section ${index + 1}`}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Videos in this section: {section.videos.length}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addVideoToSection(section.id)}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Add Video
                            </Button>
                          </div>

                          {section.videos.map((video, videoIndex) => (
                            <div key={video.id} className="border rounded-lg p-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`video-title-${video.id}`}>Video Title</Label>
                                  <Input
                                    id={`video-title-${video.id}`}
                                    value={video.title}
                                    onChange={(e) => updateVideo(section.id, video.id, { title: e.target.value })}
                                    placeholder={`Video ${videoIndex + 1} title`}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`video-duration-${video.id}`}>Duration (minutes)</Label>
                                  <Input
                                    id={`video-duration-${video.id}`}
                                    value={video.duration}
                                    onChange={(e) => updateVideo(section.id, video.id, { duration: e.target.value })}
                                    placeholder="e.g., 15"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <Label>Video File</Label>
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) updateVideo(section.id, video.id, { videoFile: file });
                                    }}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  />
                                </div>
                                <div>
                                  <Label>Video Thumbnail</Label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) updateVideo(section.id, video.id, { thumbnail: file });
                                    }}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                  />
                                </div>
                              </div>

                              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{video.feedback.thumbsUp}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ThumbsDown className="h-4 w-4" />
                                  <span>{video.feedback.thumbsDown}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex space-x-4">
                    <Button onClick={handleFinalizeCourse} className="flex-1">
                      Create Course
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateForm(false);
                        setCurrentStep(1);
                        setCourseSections([]);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedCourseForVideos(course.id)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Manage Videos
                      </Button>
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
