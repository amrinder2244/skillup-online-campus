
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Search, User, GraduationCap } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 group-hover:bg-white/30 transition-all duration-300">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">EasyLearn</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for courses, skills, or topics..."
                className="pl-12 w-full bg-white/95 backdrop-blur-sm border-white/20 rounded-full h-12 text-gray-700 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'instructor' && (
                  <Link to="/instructor/dashboard">
                    <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
                      Instructor Hub
                    </Button>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard">
                    <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                {user.role === 'student' && (
                  <Link to="/my-courses">
                    <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
                      My Learning
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="bg-white/30 rounded-full p-1">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">{user.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-purple-700 hover:bg-gray-100 rounded-full px-6 font-semibold shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
