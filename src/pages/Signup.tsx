import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  const onSubmit = (data: FormValues) => {
    console.log('Validated form data:', data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card px-8 py-10 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your information to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  aria-invalid={!!errors.name}
                  className={errors.name ? 'border-destructive pr-10' : 'pr-10'}
                />
              </div>
              {errors.name && (
                <p className="text-sm font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                  className={
                    errors.email ? 'border-destructive pr-10' : 'pr-10'
                  }
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  className={
                    errors.password ? 'border-destructive pr-10' : 'pr-10'
                  }
                />
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthYear">Birth Year</Label>
              <div className="relative">
                <Input
                  id="birthYear"
                  type="number"
                  placeholder="1990"
                  {...register('birthYear', { valueAsNumber: true })}
                  aria-invalid={!!errors.birthYear}
                  className={
                    errors.birthYear ? 'border-destructive pr-10' : 'pr-10'
                  }
                />
              </div>
              {errors.birthYear && (
                <p className="text-sm font-medium text-destructive">
                  {errors.birthYear.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            Sign up
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
