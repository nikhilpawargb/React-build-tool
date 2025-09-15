import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  image: string;
  progress?: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    level: 'beginner',
    duration: '8 hours',
    image: '/js-course.jpg',
    progress: 65
  },
  {
    id: '2',
    title: 'React Development',
    description: 'Build modern web applications with React',
    level: 'intermediate',
    duration: '12 hours',
    image: '/react-course.jpg',
    progress: 30
  },
  {
    id: '3',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts and patterns',
    level: 'advanced',
    duration: '10 hours',
    image: '/ts-course.jpg'
  }
];

export function Courses() {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredCourses = filter === 'all' 
    ? mockCourses 
    : mockCourses.filter(course => course.level === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Available Courses</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Choose from our comprehensive programming courses</p>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex gap-4">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === level
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-xl transition-all p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-4">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Course Image</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    course.level === 'beginner' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                      : course.level === 'intermediate' 
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                  }`}>
                    {course.level}
                  </span>
                  <span>{course.duration}</span>
                </div>
                {course.progress && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-colors"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
