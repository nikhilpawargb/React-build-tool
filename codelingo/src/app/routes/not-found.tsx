import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/courses"
            className="block border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
