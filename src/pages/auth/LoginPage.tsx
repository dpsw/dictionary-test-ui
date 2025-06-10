import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store';
import { AuthLayout } from '../../components/Auth/AuthLayout';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        setCurrentUser({
          id: 'user-1',
          name: 'Demo User',
          email: formData.email,
          favorites: {
            dictionaries: [],
            grammars: []
          }
        });
        navigate('/home');
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue your language learning journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-error-500 flex-shrink-0" />
            <span className="text-error-700 text-sm">{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="email" className="form-label">Email address</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="form-input pl-10"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-input pl-10 pr-10"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-3 text-base"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-primary-600 hover:text-primary-500 font-medium">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};