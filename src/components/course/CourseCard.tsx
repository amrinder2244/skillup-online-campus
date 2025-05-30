
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, User } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isEnrolled?: boolean;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {course.level}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600">
          <Link to={`/course/${course.id}`}>{course.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <User className="h-4 w-4 mr-1" />
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">{course.students} students</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${course.price === 0 ? 'Free' : course.price}
            </span>
            {course.originalPrice && course.price > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
          
          {course.isEnrolled ? (
            <Link to={`/course/${course.id}/learn`}>
              <Button size="sm">Continue Learning</Button>
            </Link>
          ) : (
            <Link to={`/course/${course.id}`}>
              <Button size="sm" variant={course.price === 0 ? "default" : "outline"}>
                {course.price === 0 ? 'Enroll Now' : 'View Course'}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
