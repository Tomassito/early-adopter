import { Radio as RadioBaseUi } from '@base-ui-components/react/radio';

type Props<T> = {
  value: T;
  label: string;
  onClick: (newValue: T) => void;
};

export const Item = <T,>({ value, label, onClick }: Props<T>) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <RadioBaseUi.Root
        onClick={() => onClick(value)}
        value={value}
        className="flex size-5 items-center justify-center rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-[checked]:bg-gray-900 data-[unchecked]:border data-[unchecked]:border-gray-300 cursor-pointer"
      >
        <RadioBaseUi.Indicator className="flex before:size-2 before:rounded-full before:bg-gray-50 data-[unchecked]:hidden" />
      </RadioBaseUi.Root>
      {label}
    </label>
  );
};
