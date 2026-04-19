'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import * as z from 'zod';
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  Field,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T, T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: 'SIGN_IN' | 'SIGN_UP';
}

export const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues = {} as DefaultValues<T>,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log(data);
  };

  const buttonText = formType === 'SIGN_IN' ? 'Sign in' : 'Sign up';

  return (
    <form
      id="form-rhf-input"
      className="mt-10 space-y-6"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      {Object.keys(defaultValues).length > 0 &&
        Object.keys(defaultValues).map((field) => (
          <FieldGroup key={field}>
            <Controller
              name={field as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex w-full flex-col gap-2.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel
                    className="paragraph-medium text-dark400_light700"
                    htmlFor={field.name}
                  >
                    {field.name === 'email'
                      ? 'Email Address'
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    required
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type={field.name === 'password' ? 'password' : 'text'}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        ))}

      <div className="flex flex-col gap-2.5">
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          type="submit"
          form="form-rhf-input"
        >
          {form.formState.isSubmitting
            ? buttonText === 'Sign in'
              ? 'Signing in...'
              : 'Signing up...'
            : buttonText}
        </Button>

        {formType === 'SIGN_IN' ? (
          <p>
            Dont have an account?{' '}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGN_UP}
            >Sign Up</Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={ROUTES.SIGN_IN}
            >Sign In</Link>
          </p>
        )}
      </div>
    </form>
  );
};
