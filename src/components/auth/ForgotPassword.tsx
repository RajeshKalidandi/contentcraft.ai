import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import { Mail } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [message, setMessage] = React.useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setMessage('Check your email for password reset instructions');
    } catch (error) {
      setError('root', {
        message: 'Failed to reset password',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - ContentCraft.ai</title>
        <meta name="description" content="Reset your ContentCraft.ai account password" />
        <meta name="keywords" content="reset password, forgot password, account recovery" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset your password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {message && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-700">{message}</p>
              </div>
            )}

            {errors.root && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{errors.root.message}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {isSubmitting ? 'Sending...' : 'Send reset instructions'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}