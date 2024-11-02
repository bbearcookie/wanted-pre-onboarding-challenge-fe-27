import { cn } from '@/utils/shadcn';
import React from 'react';

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'cursor-pointer rounded-md bg-slate-200 p-1 text-black transition-all hover:bg-slate-300 hover:text-gray-600',
      className,
    )}
    {...props}
  />
));
IconButton.displayName = 'IconButton';

export { IconButton };
