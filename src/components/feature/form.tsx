import { DevTool } from '@hookform/devtools';
import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export interface FormProps<TFieldValues extends FieldValues> {
  className?: string;
  form: UseFormReturn<TFieldValues>;
  onSubmit?: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  children?: React.ReactNode;
}

const Form = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  onError,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  const handleFormSubmit: SubmitHandler<TFieldValues> = (data) => {
    onSubmit?.(data);
  };

  const handleFormError: SubmitErrorHandler<TFieldValues> = (error) => {
    onError?.(error);
  };

  return (
    <FormProvider {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
      >
        {children}
      </form>
      <DevTool control={form.control} />
    </FormProvider>
  );
};

export default Form;
