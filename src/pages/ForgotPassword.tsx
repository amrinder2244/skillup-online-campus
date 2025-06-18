
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Mail, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock password reset request - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Mock password reset - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetComplete(true);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset complete state
  if (resetComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <BookOpen className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EasyLearn</span>
            </Link>
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Password Reset Complete</h2>
            <p className="mt-2 text-gray-600">
              Your password has been successfully reset.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  You can now log in with your new password.
                </p>
                <Link to="/login">
                  <Button className="w-full">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Email sent state with option to proceed to reset form
  if (emailSent && !showResetForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <BookOpen className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EasyLearn</span>
            </Link>
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Check Your Email</h2>
            <p className="mt-2 text-gray-600">
              We've sent password reset instructions to {email}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  onClick={() => setShowResetForm(true)}
                  className="w-full"
                >
                  I Have the Reset Code
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEmailSent(false)}
                  className="w-full"
                >
                  Try Again
                </Button>
                <div className="text-center">
                  <Link to="/login" className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-500">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Reset password form
  if (showResetForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <BookOpen className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EasyLearn</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Reset Your Password</h2>
            <p className="mt-2 text-gray-600">
              Enter your new password below
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter new password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm new password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <ul className="space-y-1">
                    <li>• Password must be at least 6 characters long</li>
                    <li>• Both passwords must match</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowResetForm(false)}
                    className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-500 mx-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Email</span>
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Initial email form
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EasyLearn</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>

              <div className="text-center">
                <Link to="/login" className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-500">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
