import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import CourseCard, { Course } from '@/components/course/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid2X2, List, Star, Clock, User, BookOpen } from 'lucide-react';

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Extended mock data with more courses
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete React Developer Course',
        description: 'Learn React from scratch and build amazing web applications. This comprehensive course covers everything from basic concepts to advanced patterns including hooks, context, and state management.',
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
        description: 'Master Python programming from basics to advanced concepts. Perfect for complete beginners who want to start their programming journey.',
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
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && course.price === 0) ||
                          (priceFilter === 'paid' && course.price > 0);
      
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
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
  }, [courses, searchTerm, selectedCategory, selectedLevel, priceFilter, sortBy]);

  const categories = ['all', 'Web Development', 'Programming', 'Design', 'Backend Development', 'Data Science', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setPriceFilter('all');
    setSortBy('popularity');
  };

  const CourseListItem = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative md:w-64 h-48 md:h-32 flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {course.level}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-xl text-gray-900 hover:text-blue-600 cursor-pointer">
              {course.title}
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${course.price === 0 ? 'Free' : course.price}
              </div>
              {course.originalPrice && course.price > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  ${course.originalPrice}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.students} students</span>
              </div>
            </div>
            
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              {course.price === 0 ? 'Enroll Now' : 'View Course'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

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
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
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

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
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

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
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

            <Button variant="outline" onClick={clearAllFilters} size="sm">
              Clear Filters
            </Button>
          </div>

          {/* Applied Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
              </Badge>
            )}
            {selectedLevel !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Level: {selectedLevel}
                <button onClick={() => setSelectedLevel('all')} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
              </Badge>
            )}
            {priceFilter !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: {priceFilter === 'free' ? 'Free' : 'Paid'}
                <button onClick={() => setPriceFilter('all')} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="transform hover:scale-105 transition-transform duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <CourseListItem key={course.id} course={course} />
            ))}
          </div>
        )}

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
              <Button onClick={clearAllFilters}>
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
