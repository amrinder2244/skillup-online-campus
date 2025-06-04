
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Ban, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Teacher {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'blocked';
  coursesCreated: number;
  totalStudents: number;
  totalRevenue: number;
}

const AllTeachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Mock teachers data
    const mockTeachers: Teacher[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2024-01-15',
        status: 'active',
        coursesCreated: 5,
        totalStudents: 2340,
        totalRevenue: 156780
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        joinDate: '2024-02-20',
        status: 'active',
        coursesCreated: 3,
        totalStudents: 890,
        totalRevenue: 67500
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        joinDate: '2024-03-10',
        status: 'blocked',
        coursesCreated: 2,
        totalStudents: 450,
        totalRevenue: 32100
      },
      {
        id: '4',
        name: 'Emily Chen',
        email: 'emily@example.com',
        joinDate: '2024-03-25',
        status: 'active',
        coursesCreated: 4,
        totalStudents: 1560,
        totalRevenue: 98400
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@example.com',
        joinDate: '2024-04-01',
        status: 'active',
        coursesCreated: 1,
        totalStudents: 234,
        totalRevenue: 18950
      }
    ];
    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers);
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  const handleStatusToggle = (teacherId: string) => {
    setTeachers(teachers.map(teacher =>
      teacher.id === teacherId
        ? { ...teacher, status: teacher.status === 'active' ? 'blocked' : 'active' }
        : teacher
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All Teachers</h1>
          <p className="text-gray-600">Manage and view all registered instructors</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Teachers Management</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teachers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{new Date(teacher.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{teacher.coursesCreated}</TableCell>
                    <TableCell>{teacher.totalStudents.toLocaleString()}</TableCell>
                    <TableCell>${teacher.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        teacher.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusToggle(teacher.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllTeachers;
