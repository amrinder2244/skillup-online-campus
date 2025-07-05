import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CourseCard, { Course } from '@/components/course/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Extended mock data with more courses
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
      },
      {
        id: '5',
        title: 'JavaScript Fundamentals',
        description: 'Master JavaScript from basics to advanced concepts',
        instructor: 'Alex Chen',
        price: 59.99,
        originalPrice: 99.99,
        rating: 4.5,
        students: 11250,
        duration: '30 hours',
        image: '/placeholder.svg',
        category: 'Programming',
        level: 'Beginner'
      },
      {
        id: '6',
        title: 'Advanced CSS & Sass',
        description: 'Create beautiful, responsive websites with modern CSS techniques',
        instructor: 'Emily Davis',
        price: 69.99,
        rating: 4.7,
        students: 7890,
        duration: '28 hours',
        image: '/placeholder.svg',
        category: 'Web Development',
        level: 'Advanced'
      },
      {
        id: '7',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning',
        instructor: 'Dr. Robert Kim',
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.8,
        students: 6750,
        duration: '60 hours',
        image: '/placeholder.svg',
        category: 'Data Science',
        level: 'Advanced'
      },
      {
        id: '8',
        title: 'Mobile App Development with Flutter',
        description: 'Build cross-platform mobile apps with Google\'s Flutter framework',
        instructor: 'Lisa Wang',
        price: 99.99,
        rating: 4.6,
        students: 5420,
        duration: '50 hours',
        image: '/placeholder.svg',
        category: 'Mobile Development',
        level: 'Intermediate'
      }
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  useEffect(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order for newest
        break;
      default: // popularity
        filtered.sort((a, b) => b.students - a.students);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy]);

  const categories = ['all', 'Web Development', 'Programming', 'Design', 'Backend Development', 'Data Science', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Discover thousands of courses to boost your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="transform hover:scale-105 transition-transform duration-300">
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available courses.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}>
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
