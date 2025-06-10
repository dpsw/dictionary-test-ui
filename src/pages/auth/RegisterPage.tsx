import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store';
import { AuthLayout } from '../../components/Auth/AuthLayout';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setCurrentUser({
        id: 'user-new',
        name: formData.name,
        email: formData.email,
        favorites: {
          dictionaries: [],
          grammars: []
        }
      });
      navigate('/home');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of language learners building their personal dictionaries"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-error-500 flex-shrink-0" />
            <span className="text-error-700 text-sm">{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="name" className="form-label">Full name</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              className="form-input pl-10"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

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
              placeholder="Create a password"
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
          
          {formData.password && (
            <div className="mt-2 space-y-1">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  {req.met ? (
                    <CheckCircle className="h-3 w-3 text-success-500" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  <span className={req.met ? 'text-success-600' : 'text-gray-500'}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="form-input pl-10 pr-10"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              className="form-checkbox mt-1"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !acceptTerms}
          className="w-full btn-primary py-3 text-base"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-500 font-medium">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};