import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import tw from 'twrnc';
import { ButtonProps } from '../types';
import { buttonColor } from '@/constants/Colors';

const buttonVariants = cva('rounded-md py-5 text-white mx-auto items-center px-5 w-full', {
  variants: {
    variant: {
      primary: `bg-[${buttonColor}] text-white border-transparent`,
      secondary: 'bg-[#f4f4f4] text-black shadow-inner border-gray-300',
    },
    size: {
      sm: 'py-1 px-2',
      md: 'py-2 px-4',
      lg: 'py-4 px-6 shadow',
    },
    disabled: {
      true: 'bg-gray-400',
    },
    loading: {
      true: 'bg-yellow-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps & ButtonVariantProps> = ({
  size,
  variant,
  className,
  text,
  type,
  isicon,
  icon,
  disabled,
  onPress,
}) => {
  const buttonStyles = buttonVariants({ variant, size, disabled });

  return (
    <TouchableOpacity
      style={tw`${buttonStyles} ${className || ''}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={tw`text-${variant === 'primary' ? 'white' : 'white'}`}>
        {text}
      </Text>
      {isicon && icon && (
        <View style={tw`ml-2`}>
          {icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;