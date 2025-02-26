export interface SocialButtonProps {
    icon: string;
    text: string;
    alt: string;
    siteURL:string;
  }

export interface InputFieldProps {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  value: string;
  required?: boolean;
    error?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.RefCallback<HTMLInputElement>;
}
