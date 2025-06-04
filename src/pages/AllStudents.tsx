
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Ban, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'blocked';
  coursesEnrolled: number;
  totalSpent: number;
}

const AllStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Mock students data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        joinDate: '2024-01-15',
        status: 'active',
        coursesEnrolled: 3,
        totalSpent: 267.97
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        joinDate: '2024-02-20',
        status: 'active',
        coursesEnrolled: 1,
        totalSpent: 89.99
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol@example.com',
        joinDate: '2024-03-10',
        status: 'blocked',
        coursesEnrolled: 2,
        totalSpent: 179.98
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david@example.com',
        joinDate: '2024-03-25',
        status: 'active',
        coursesEnrolled: 5,
        totalSpent: 449.95
      },
      {
        id: '5',
        name: 'Eva Brown',
        email: 'eva@example.com',
        joinDate: '2024-04-01',
        status: 'active',
        coursesEnrolled: 1,
        totalSpent: 129.99
      }
    ];
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleStatusToggle = (studentId: string) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, status: student.status === 'active' ? 'blocked' : 'active' }
        : student
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
          <h1 className="text-3xl font-bold text-gray-900">All Students</h1>
          <p className="text-gray-600">Manage and view all registered students</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students Management</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students by name or email..."
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
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{new Date(student.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{student.coursesEnrolled}</TableCell>
                    <TableCell>${student.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
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
                          onClick={() => handleStatusToggle(student.id)}
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

export default AllStudents;
