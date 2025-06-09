
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Instead of directly registering, navigate to OTP verification
      navigate('/verify-otp', { state: { email: formData.email, userData: formData } });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">EasyLearn</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Join EasyLearn today</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-500 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 rounded-lg border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 rounded-lg border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-gray-700 font-medium">I want to</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 block w-full h-12 rounded-lg border-gray-200 px-4 bg-white text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="student">Learn (Student)</option>
                  <option value="instructor">Teach (Instructor)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 rounded-lg border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 rounded-lg border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Confirm your password"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
