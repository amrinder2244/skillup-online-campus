
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Course } from '@/components/course/CourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { Star, Clock, Users, BookOpen, Play, CheckCircle } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock course data - replace with actual API call
    const mockCourse: Course = {
      id: courseId || '1',
      title: 'Complete React Developer Course',
      description: 'Master React from scratch and build professional web applications. This comprehensive course covers everything from basic components to advanced state management, routing, and deployment. Perfect for beginners and those looking to level up their React skills.',
      instructor: 'John Doe',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.8,
      students: 15420,
      duration: '40 hours',
      image: '/placeholder.svg',
      category: 'Web Development',
      level: 'Intermediate'
    };

    setCourse(mockCourse);
    setIsEnrolled(false); // Check if user is enrolled
    setLoading(false);
  }, [courseId]);

  const handleEnroll = () => {
    if (course?.price === 0) {
      // Free course enrollment
      setIsEnrolled(true);
    } else {
      // Redirect to payment
      window.open('/payment', '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">Course not found</div>
        </div>
      </div>
    );
  }

  const curriculum = [
    {
      title: 'Introduction to React',
      duration: '2 hours',
      lessons: [
        'What is React?',
        'Setting up the development environment',
        'Your first React component',
        'Understanding JSX'
      ]
    },
    {
      title: 'Components and Props',
      duration: '3 hours',
      lessons: [
        'Creating functional components',
        'Understanding props',
        'Component composition',
        'Conditional rendering'
      ]
    },
    {
      title: 'State and Event Handling',
      duration: '4 hours',
      lessons: [
        'Introduction to state',
        'useState hook',
        'Handling events',
        'Forms in React'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <nav className="text-sm text-gray-300 mb-4">
                <Link to="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <span>{course.category}</span>
              </nav>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-semibold mr-1">{course.rating}</span>
                  <span className="text-gray-300">({course.students} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-4" />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </div>
                    {course.originalPrice && course.price > 0 && (
                      <div className="text-lg text-gray-500 line-through">
                        ${course.originalPrice}
                      </div>
                    )}
                  </div>

                  {user ? (
                    isEnrolled ? (
                      <Link to={`/course/${course.id}/learn`}>
                        <Button className="w-full mb-4" size="lg">
                          Continue Learning
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full mb-4" 
                        size="lg"
                        onClick={handleEnroll}
                      >
                        {course.price === 0 ? 'Enroll for Free' : 'Buy Now'}
                      </Button>
                    )
                  ) : (
                    <Link to="/login">
                      <Button className="w-full mb-4" size="lg">
                        Sign in to Enroll
                      </Button>
                    </Link>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-600" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-gray-600" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-600" />
                      <span>Access on mobile and desktop</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Build modern React applications from scratch',
                  'Master React hooks and state management',
                  'Create reusable components',
                  'Handle routing with React Router',
                  'Connect to APIs and manage data',
                  'Deploy applications to production',
                  'Test React applications',
                  'Optimize performance'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="space-y-4">
                {curriculum.map((section, index) => (
                  <div key={index} className="border rounded-lg">
                    <div className="p-4 bg-gray-50 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{section.title}</h3>
                        <span className="text-sm text-gray-600">{section.duration}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center">
                          <Play className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">{course.instructor}</div>
                  <div className="text-sm text-gray-600">Senior Developer</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                John is a senior full-stack developer with over 8 years of experience in React, 
                Node.js, and modern web technologies. He has taught over 100,000 students worldwide.
              </p>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span>50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Courses:</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span>4.9 ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
