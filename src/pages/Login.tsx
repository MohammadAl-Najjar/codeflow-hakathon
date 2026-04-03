import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInUser } from '@/lib/auth/signInUser';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  email: z.email({ message: 'Must be a valid email address.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { user } = await signInUser(data.email, data.password);
      console.log('Login submitted with data:', user);
      navigate('/protected/profile');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error logging into your account. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left panel - Hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/hotel-hero.png"
          alt="Heritage Archive Hotel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.85)] via-[hsl(218_100%_6%/0.4)] to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="label-caps text-[hsl(43_80%_42%)] mb-3">Est. 1924</div>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight tracking-tight">
            localhost
          </h1>
          <p className="mt-4 max-w-sm text-lg text-white/70 font-serif italic">
            The quiet luxury of a well-kept secret.
          </p>
          <p className="mt-2 text-sm text-white/50">
            Archive your moments.
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-10">
            <div className="label-caps text-gold mb-1">Est. 1924</div>
            <h1 className="font-serif text-2xl font-bold text-foreground tracking-wide">
              HERITAGE ARCHIVE
            </h1>
          </div>

          <div className="label-caps text-muted-foreground mb-2">
            Member Access
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your archive.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="label-caps text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                className={`bg-transparent border-0 border-b rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-gold shadow-none transition-colors ${
                  errors.email
                    ? 'border-destructive'
                    : 'border-border focus:border-gold'
                }`}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="label-caps text-muted-foreground">
                  Password
                </Label>
                <span className="text-xs text-gold cursor-pointer hover:underline gold-underline">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  className={`bg-transparent border-0 border-b rounded-none px-0 py-2 pr-10 focus-visible:ring-0 focus-visible:border-gold shadow-none transition-colors ${
                    errors.password
                      ? 'border-destructive'
                      : 'border-border focus:border-gold'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entering the Archive...' : 'Enter the Archive'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Not yet a member?{' '}
            <Link
              to="/signup"
              className="font-medium text-foreground hover:text-gold transition-colors gold-underline"
            >
              Join the Archive
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-muted-foreground/60 leading-relaxed">
            By entering, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
