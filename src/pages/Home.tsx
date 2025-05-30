
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CourseCard, { Course } from '@/components/course/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Award, Play } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete React Developer Course',
        description: 'Learn React from scratch and build amazing web applications',
        instructor: 'John Doe',
        price: 89.99,
        originalPrice: 149.99,
        rating: 4.8,
        students: 15420,
        duration: '40 hours',
        image: '/placeholder.svg',
        category: 'Web Development',
        level: 'Intermediate'
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
        level: 'Beginner'
      },
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
      },
      {
        id: '4',
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js and Express',
        instructor: 'Sarah Wilson',
        price: 94.99,
        rating: 4.7,
        students: 9670,
        duration: '45 hours',
        image: '/placeholder.svg',
        category: 'Backend Development',
        level: 'Intermediate'
      }
    ];

    setCourses(mockCourses);
    setFeaturedCourses(mockCourses.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Start, switch, or advance your career with thousands of courses from world-class instructors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input
                type="text"
                placeholder="What do you want to learn?"
                className="text-gray-900"
              />
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Search Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">57,000+</div>
              <div className="text-gray-600">Online Courses</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">1M+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">15,000+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="flex flex-col items-center">
              <Play className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">400+</div>
              <div className="text-gray-600">Hours of Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses, carefully selected by our expert instructors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <Button variant="outline">View All Courses</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of students and start your learning journey today. Choose from thousands of courses.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
