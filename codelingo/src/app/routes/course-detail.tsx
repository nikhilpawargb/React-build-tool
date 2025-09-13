import { useParams, Link } from 'react-router-dom';

interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  lessons: Array<{
    id: string;
    title: string;
    type: 'video' | 'exercise' | 'quiz';
    duration: string;
    completed: boolean;
  }>;
}

const mockCourseData = {
  '1': {
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    instructor: 'John Doe',
    level: 'beginner',
    totalDuration: '8 hours',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to JavaScript',
        duration: '2 hours',
        completed: true,
        lessons: [
          { id: 'l1', title: 'What is JavaScript?', type: 'video', duration: '15 min', completed: true },
          { id: 'l2', title: 'Setting up Development Environment', type: 'video', duration: '20 min', completed: true },
          { id: 'l3', title: 'Your First JavaScript Program', type: 'exercise', duration: '30 min', completed: true }
        ]
      },
      {
        id: 'm2',
        title: 'Variables and Data Types',
        duration: '3 hours',
        completed: false,
        lessons: [
          { id: 'l4', title: 'Understanding Variables', type: 'video', duration: '25 min', completed: true },
          { id: 'l5', title: 'Data Types in JavaScript', type: 'video', duration: '30 min', completed: false },
          { id: 'l6', title: 'Practice: Working with Variables', type: 'exercise', duration: '45 min', completed: false }
        ]
      }
    ] as Module[]
  }
};

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? mockCourseData[courseId as keyof typeof mockCourseData] : null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-indigo-600 hover:text-indigo-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link to="/courses" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            ← Back to Courses
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{course.description}</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>Instructor: {course.instructor}</span>
            <span>Level: {course.level}</span>
            <span>Duration: {course.totalDuration}</span>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h2>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{module.title}</h3>
                    {module.completed && (
                      <span className="text-green-600 text-sm">✓ Completed</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{module.duration}</p>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between text-sm">
                        <span className={lesson.completed ? 'text-gray-900' : 'text-gray-500'}>
                          {lesson.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{lesson.duration}</span>
                          {lesson.completed && <span className="text-green-600">✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Lesson</h2>
              <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500">Video Player / Exercise Area</span>
              </div>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  Previous Lesson
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Next Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
