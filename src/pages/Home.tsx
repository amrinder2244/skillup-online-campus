import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import CourseCard, { Course } from '@/components/course/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Award, Play, Star, TrendingUp, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90"></div>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Zap className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Join 1M+ learners worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with thousands of expert-led courses. Start learning today and transform your future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-12">
              <div className="relative flex-1 w-full">
                <Input
                  type="text"
                  placeholder="What would you like to learn today?"
                  className="text-gray-900 h-14 rounded-full border-0 bg-white/95 backdrop-blur-sm pl-6 pr-4 text-lg placeholder:text-gray-500 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl">
                Start Learning
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-4 w-4 mr-2 text-yellow-300" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2 text-green-300" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">57,000+</div>
              <div className="text-gray-600 font-medium">Online Courses</div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600 font-medium">Happy Students</div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15,000+</div>
              <div className="text-gray-600 font-medium">Expert Instructors</div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">400+</div>
              <div className="text-gray-600 font-medium">Hours of Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-2 mb-6">
              <Star className="h-5 w-5 mr-2 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Most Popular</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses, carefully selected by our expert instructors and loved by students worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="transform hover:scale-105 transition-transform duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Courses</h2>
              <p className="text-gray-600">Trending courses loved by our community</p>
            </div>
            <Button variant="outline" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700 rounded-full px-8">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="transform hover:scale-105 transition-transform duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Zap className="h-5 w-5 mr-2 text-yellow-300" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join millions of students and unlock your potential. Choose from thousands of courses and start learning today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-4 text-lg">
              Explore Courses
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-400">
            <span>✅ 30-day money-back guarantee</span>
            <span className="mx-4">•</span>
            <span>✅ Lifetime access</span>
            <span className="mx-4">•</span>
            <span>✅ Certificate of completion</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
