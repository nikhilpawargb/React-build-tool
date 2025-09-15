import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  completedCourses: number;
  hoursLearned: number;
  currentStreak: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatar.jpg',
  joinDate: 'January 2024',
  completedCourses: 3,
  hoursLearned: 42,
  currentStreak: 7,
  skillLevel: 'intermediate'
};

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(mockUser);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to the backend
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-300 text-2xl">👤</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="text-xl font-semibold text-center border rounded px-2 py-1 mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{user.name}</h2>
                )}
                
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="text-gray-600 dark:text-gray-300 text-center border rounded px-2 py-1 mb-4 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{user.email}</p>
                )}

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Member since {user.joinDate}</p>

                {isEditing ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleSave}
                      className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats and progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{user.completedCourses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Courses Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{user.hoursLearned}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Hours Learned</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{user.currentStreak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  user.skillLevel === 'beginner' ? 'text-green-600 dark:text-green-400' :
                  user.skillLevel === 'intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {user.skillLevel.charAt(0).toUpperCase() + user.skillLevel.slice(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Skill Level</div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Completed "Variables and Data Types"</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">JavaScript Fundamentals</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Started "React Development"</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">New course enrollment</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Achieved 7-day streak</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Consistency milestone</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">JavaScript Fundamentals</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed January 2024</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">HTML & CSS Basics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed December 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
