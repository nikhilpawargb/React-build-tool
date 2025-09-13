import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-indigo-600">CodeLingo</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master programming languages through interactive lessons, hands-on coding exercises, 
          and real-world projects. Start your coding journey today.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/courses"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            to="/profile"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
