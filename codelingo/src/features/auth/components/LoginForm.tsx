import { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { useLogin } from '../hooks/use-auth';
import { isValidEmail } from '../../../utils/validators';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ isOpen, onClose, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginMutation = useLogin();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await loginMutation.mutateAsync({
        email,
        password,
        rememberMe,
      });
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Forgot password?
          </button>
        </div>

        {loginMutation.error && (
          <div className="text-red-500 text-sm">
            {(loginMutation.error as any)?.message || 'Login failed. Please try again.'}
          </div>
        )}

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full"
            isLoading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Sign In
          </Button>

          {onSwitchToRegister && (
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
