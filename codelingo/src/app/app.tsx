import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
