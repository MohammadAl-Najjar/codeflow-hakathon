import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/lib/createUser';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters string.' }),
  email: z.email({ message: 'Must be a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  birthYear: z
    .number()
    .int({ message: 'Birth year must be an integer.' })
    .min(1900, { message: 'Birth year must be after 1900.' })
    .max(new Date().getFullYear(), {
      message: 'Birth year cannot be in the future.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Signup() {
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
      name: '',
      email: '',
      password: '',
      birthYear: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Form submitted with data:', data);
      await createUser(data.name, data.email, data.password, data.birthYear);
      navigate('/protected/profile');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        'Sorry, there was an error creating your account. Please try again.',
      );
    }
  };

  const inputClasses = (hasError: boolean) =>
    `bg-transparent border-0 border-b rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-gold shadow-none transition-colors ${
      hasError ? 'border-destructive' : 'border-border focus:border-gold'
    }`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left panel - Hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/images/luxury-suite.png"
          alt="Heritage Archive Suite"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.85)] via-[hsl(218_100%_6%/0.4)] to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="label-caps text-[hsl(43_80%_42%)] mb-3">Est. 1924</div>
          <h1 className="font-serif text-5xl font-bold text-white leading-tight tracking-tight">
            HERITAGE
            <br />
            ARCHIVE
          </h1>
          <p className="mt-4 max-w-sm text-lg text-white/70 font-serif italic">
            Begin your chapter in the archive.
          </p>
          <p className="mt-2 text-sm text-white/50">
            Every guest becomes part of our story.
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
            New Membership
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Join the Archive
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your membership to begin your journey.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="label-caps text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Arthur Sterling"
                {...register('name')}
                aria-invalid={!!errors.name}
                className={inputClasses(!!errors.name)}
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                className={inputClasses(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="label-caps text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  className={`${inputClasses(!!errors.password)} pr-10`}
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

            <div className="space-y-1.5">
              <Label htmlFor="birthYear" className="label-caps text-muted-foreground">
                Birth Year
              </Label>
              <Input
                id="birthYear"
                type="number"
                placeholder="1990"
                {...register('birthYear', { valueAsNumber: true })}
                aria-invalid={!!errors.birthYear}
                className={inputClasses(!!errors.birthYear)}
              />
              {errors.birthYear && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.birthYear.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-11 mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Membership...' : 'Create Membership'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already a member?{' '}
            <Link
              to="/login"
              className="font-medium text-foreground hover:text-gold transition-colors gold-underline"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-muted-foreground/60 leading-relaxed">
            By joining, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
