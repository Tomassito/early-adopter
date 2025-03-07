import { RadioGroup as RadioGroupBaseUi } from '@base-ui-components/react/radio-group';
import { Item } from '@/app/components/material/Radio/Item';
import { BasicFilterOption } from '@/types/Filters';

type Props<Value> = {
  value: Value;
  defaultValue?: Value;
  caption?: string;
  onChange: (newValue: Value) => void;
  options: BasicFilterOption<Value>[];
};

export const Radio = <Value,>({
  options,
  value,
  defaultValue,
  caption,
  onChange,
}: Props<Value>) => {
  return (
    <RadioGroupBaseUi
      aria-labelledby="caption"
      defaultValue={defaultValue}
      value={value}
      className="flex flex-col items-start gap-1"
    >
      <div className="font-medium" id="caption">
        {caption}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {options.map(({ label, value }) => (
          <Item
            key={label}
            value={value}
            label={label}
            onClick={(newValue) => onChange(newValue)}
          />
        ))}
      </div>
    </RadioGroupBaseUi>
  );
};
