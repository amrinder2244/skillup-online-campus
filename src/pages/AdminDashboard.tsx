
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, DollarSign, TrendingUp, Eye, Ban, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor';
  joinDate: string;
  status: 'active' | 'blocked';
}

interface CourseStats {
  id: string;
  title: string;
  instructor: string;
  students: number;
  revenue: number;
  status: 'active' | 'flagged';
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<CourseStats[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'instructor',
        joinDate: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'student',
        joinDate: '2024-02-20',
        status: 'active'
      },
      {
        id: '3',
        name: 'Bob Wilson',
        email: 'bob@example.com',
        role: 'student',
        joinDate: '2024-03-10',
        status: 'blocked'
      }
    ];

    const mockCourses: CourseStats[] = [
      {
        id: '1',
        title: 'Complete React Developer Course',
        instructor: 'John Doe',
        students: 1542,
        revenue: 138780,
        status: 'active'
      },
      {
        id: '2',
        title: 'Python for Beginners',
        instructor: 'Jane Smith',
        students: 835,
        revenue: 0,
        status: 'active'
      },
      {
        id: '3',
        title: 'Suspicious Course Title',
        instructor: 'Unknown User',
        students: 5,
        revenue: 399,
        status: 'flagged'
      }
    ];

    setUsers(mockUsers);
    setCourses(mockCourses);
    setStats({
      totalUsers: 15420,
      totalCourses: 567,
      totalRevenue: 2456789,
      monthlyGrowth: 12.5
    });
  }, []);

  const handleUserAction = (userId: string, action: 'block' | 'unblock') => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'block' ? 'blocked' : 'active' }
        : user
    ));
  };

  const handleCourseAction = (courseId: string, action: 'delete' | 'approve') => {
    if (action === 'delete') {
      setCourses(courses.filter(course => course.id !== courseId));
    } else {
      setCourses(courses.map(course =>
        course.id === courseId ? { ...course, status: 'active' } : course
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.role === 'instructor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUserAction(user.id, user.status === 'active' ? 'block' : 'unblock')}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Management */}
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{course.students} students</span>
                        <span>${course.revenue.toLocaleString()} revenue</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {course.status === 'flagged' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCourseAction(course.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCourseAction(course.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
