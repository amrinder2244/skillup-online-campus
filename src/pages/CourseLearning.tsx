
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import VideoPlayer from '@/components/course/VideoPlayer';
import CourseProgress from '@/components/course/CourseProgress';
import CertificateDownload from '@/components/course/CertificateDownload';
import { useAuth } from '@/contexts/AuthContext';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

const CourseLearning = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    // Mock lessons data
    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'Introduction to React',
        duration: '15:30',
        videoUrl: '/placeholder-video.mp4',
        completed: false
      },
      {
        id: '2',
        title: 'Setting up Development Environment',
        duration: '22:45',
        videoUrl: '/placeholder-video.mp4',
        completed: false
      },
      {
        id: '3',
        title: 'Your First React Component',
        duration: '18:20',
        videoUrl: '/placeholder-video.mp4',
        completed: false
      },
      {
        id: '4',
        title: 'Props and State',
        duration: '25:10',
        videoUrl: '/placeholder-video.mp4',
        completed: false
      },
      {
        id: '5',
        title: 'Event Handling',
        duration: '19:55',
        videoUrl: '/placeholder-video.mp4',
        completed: false
      }
    ];
    setLessons(mockLessons);
  }, [courseId]);

  const handleLessonComplete = (lessonId: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
  };

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const isCoursCompleted = completedLessons === lessons.length && lessons.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header with Progress */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Complete React Developer Course</h1>
          <CourseProgress 
            completed={completedLessons} 
            total={lessons.length}
            showDetails={true}
          />
        </div>

        {/* Certificate Download Section */}
        {isCoursCompleted && (
          <div className="mb-6">
            <CertificateDownload
              courseTitle="Complete React Developer Course"
              instructorName="John Doe"
              completionDate={new Date().toLocaleDateString()}
              studentName={user?.name || 'Student'}
              isVisible={true}
            />
          </div>
        )}

        {/* Video Player */}
        <VideoPlayer
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          onLessonChange={setCurrentLessonIndex}
          onLessonComplete={handleLessonComplete}
        />
      </div>
    </div>
  );
};

export default CourseLearning;
