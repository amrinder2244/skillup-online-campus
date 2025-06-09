
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { GraduationCap, Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const email = location.state?.email || 'user@example.com';

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock OTP verification - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') {
        toast({
          title: "Email Verified! 🎉",
          description: "Welcome to EasyLearn! Your account has been successfully verified.",
        });
        navigate('/login');
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      // Mock resend OTP - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "OTP Resent ✅",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Resend Failed",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
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
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-semibold text-purple-600">{email}</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-xl">
              <Mail className="h-5 w-5 text-purple-600" />
              <span>Enter Verification Code</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOTP}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg"
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={resending}
                className="text-purple-600 hover:text-purple-500 hover:bg-purple-50 rounded-lg"
              >
                {resending ? 'Resending...' : 'Resend Code'}
              </Button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <Link to="/register" className="text-sm text-purple-600 hover:text-purple-500 font-medium">
                ← Back to Registration
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;
