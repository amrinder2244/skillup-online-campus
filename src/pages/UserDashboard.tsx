
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CourseCard, { Course } from '@/components/course/CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Mock enrolled courses data
    const mockEnrolledCourses: Course[] = [
      {
        id: '1',
        title: 'Complete React Developer Course',
        description: 'Learn React from scratch and build amazing web applications',
        instructor: 'John Doe',
        price: 89.99,
        rating: 4.8,
        students: 15420,
        duration: '40 hours',
        image: '/placeholder.svg',
        category: 'Web Development',
        level: 'Intermediate',
        isEnrolled: true
      },
      {
        id: '2',
        title: 'Python for Beginners',
        description: 'Master Python programming from basics to advanced concepts',
        instructor: 'Jane Smith',
        price: 0,
        rating: 4.6,
        students: 8350,
        duration: '25 hours',
        image: '/placeholder.svg',
        category: 'Programming',
        level: 'Beginner',
        isEnrolled: true
      }
    ];

    const mockWishlistCourses: Course[] = [
      {
        id: '3',
        title: 'UI/UX Design Masterclass',
        description: 'Learn professional UI/UX design principles and create stunning interfaces',
        instructor: 'Mike Johnson',
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.9,
        students: 12890,
        duration: '35 hours',
        image: '/placeholder.svg',
        category: 'Design',
        level: 'Advanced'
      }
    ];

    setEnrolledCourses(mockEnrolledCourses);
    setWishlistCourses(mockWishlistCourses);
  }, []);

  const totalCourses = enrolledCourses.length;
  const completedCourses = 1; // Mock data
  const totalHours = enrolledCourses.reduce((sum, course) => sum + parseInt(course.duration), 0);
  const certificates = 1; // Mock data

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                  <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">{certificates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
            <Link to="/my-courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Wishlist */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
            <Link to="/wishlist">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
