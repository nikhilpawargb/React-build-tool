import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './app';
import { Home } from './routes/home';
import { Courses } from './routes/courses';
import { CourseDetail } from './routes/course-detail';
import { Profile } from './routes/profile';
import { NotFound } from './routes/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'course/:courseId',
        element: <CourseDetail />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
