import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../lib/mergeClasses';
import { ThreeDots } from  'react-loader-spinner'

const buttonVariants = cva(
  `rounded px-xxxl py-[10px] flex items-center justify-center w-full`,
  {
    variants: {
      variant: {
        default: 'bg-purple-500 text-white font-medium',
        transparent: 'bg-gray-500 opacity-30 text-white font-medium',
        text: 'bg-transparent border-none'
      },
      sizes: {
        default: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'default',
    }
  }
);

export interface ButtonProps extends
  ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  isLoading,
  sizes,
  variant,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(buttonVariants({ variant, sizes }), className)}
      {...props}
    >
      {children}
    </button>
  );
};



export default Button;