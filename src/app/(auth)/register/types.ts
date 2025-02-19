export interface SocialButtonProps {
    icon: string;
    text: string;
    alt: string;
    siteURL:string;
  }

  export interface InputFieldProps {
    label: string;
    type: string;
    name?: string;
    error?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }
