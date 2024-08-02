export interface TextFieldProps {
    id:any,
    label: string,
    hasError?: boolean;
    type?:any,
    error:any
    width?: number,
    placeholder?:any,
    value:any,
    prefixIcon?: any;
    surfixIcon?: any;
    className?: string,
    register?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}
export interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isicon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?:any
  style?:any
  onPress?: () => void;
}