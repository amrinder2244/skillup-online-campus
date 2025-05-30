
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

interface VideoPlayerProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onLessonChange: (index: number) => void;
  onLessonComplete: (lessonId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lessons,
  currentLessonIndex,
  onLessonChange,
  onLessonComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentLesson = lessons[currentLessonIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      
      // Mark lesson as complete if watched 90%
      if (progress > 90 && !currentLesson.completed) {
        onLessonComplete(currentLesson.id);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [currentLesson, onLessonComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * video.duration;
    
    video.currentTime = newTime;
    setProgress(newProgress);
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      onLessonChange(currentLessonIndex + 1);
    }
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      onLessonChange(currentLessonIndex - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Video Player */}
      <div className="flex-1">
        <Card>
          <CardContent className="p-0">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                src={currentLesson?.videoUrl || '/placeholder-video.mp4'}
                poster="/placeholder.svg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div 
                  className="w-full h-2 bg-gray-600 rounded cursor-pointer mb-4"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-blue-500 rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={previousLesson}
                      disabled={currentLessonIndex === 0}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextLesson}
                      disabled={currentLessonIndex === lessons.length - 1}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => {
                          const newVolume = Number(e.target.value);
                          setVolume(newVolume);
                          if (videoRef.current) {
                            videoRef.current.volume = newVolume;
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => videoRef.current?.requestFullscreen()}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lesson Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{currentLesson?.title}</h2>
              <p className="text-gray-600">Lesson {currentLessonIndex + 1} of {lessons.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Lesson List */}
      <div className="lg:w-80">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4">Course Content</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    index === currentLessonIndex
                      ? 'bg-blue-100 border border-blue-300'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => onLessonChange(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{lesson.title}</h4>
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    </div>
                    {lesson.completed && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayer;
