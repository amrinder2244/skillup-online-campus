
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Award, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificateDownloadProps {
  courseTitle: string;
  instructorName: string;
  completionDate: string;
  studentName: string;
  isVisible?: boolean;
}

const CertificateDownload: React.FC<CertificateDownloadProps> = ({
  courseTitle,
  instructorName,
  completionDate,
  studentName,
  isVisible = true
}) => {
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      // Mock certificate generation - replace with actual PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock download
      const element = document.createElement('a');
      element.href = 'data:text/plain;charset=utf-8,Certificate of Completion';
      element.download = `${courseTitle}-certificate.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Certificate Downloaded!",
        description: "Your certificate has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 rounded-full p-3">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Congratulations! You've completed the course
              </h3>
              <p className="text-gray-600">
                You can now download your certificate of completion
              </p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Student: {studentName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Course: {courseTitle}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Instructor: {instructorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Completed: {completionDate}</span>
              </div>
            </div>
            
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              {downloading ? 'Generating Certificate...' : 'Download Certificate'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateDownload;
