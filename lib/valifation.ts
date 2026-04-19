import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .pipe(z.email({ message: 'Please enter a valid email' })),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password must be less than 20 characters' }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(30, { message: 'Username must be at most 30 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),

  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be at most 50 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters' }),

  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .pipe(z.email({ message: 'Please enter a valid email' })),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
});
