import { Input as InputBaseUi } from '@base-ui-components/react';

type Props = {
  onChange: (newValue: string) => void;
  value: string;
  placeholder?: string;
  caption?: string;
};

export const Input = ({ placeholder, caption, onChange, value }: Props) => {
  return (
    <div>
      <div className="font-medium" id="caption">
        {caption}
      </div>
      <InputBaseUi
        placeholder={placeholder}
        className="h-10 w-full max-w-64 rounded-md border border-gray-200 pl-3.5 text-base text-white hover:bg-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
