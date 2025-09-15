import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">CodeLingo</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Master programming languages through interactive lessons, hands-on coding exercises, 
          and real-world projects. Start your coding journey today.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/courses"
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            to="/profile"
            className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
