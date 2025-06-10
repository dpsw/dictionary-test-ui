import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../../components/Auth/AuthLayout';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isEmailSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a password reset link to your email address"
      >
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              We've sent a password reset link to:
            </p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>Didn't receive the email? Check your spam folder or try again in a few minutes.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsEmailSent(false)}
              className="w-full btn-secondary"
            >
              Try different email
            </button>
            
            <Link to="/auth/login" className="block w-full btn-primary text-center">
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="form-label">Email address</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="form-input pl-10"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-3 text-base"
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>

        <Link
          to="/auth/login"
          className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to sign in</span>
        </Link>
      </form>
    </AuthLayout>
  );
};