import { useAnimalsFiltersStore } from '@/app/store/useAnimalsFiltersStore';
import { Radio } from '@/app/components/material/Radio';
import { BasicFilterOption } from '@/types/Filters';
import { AnimalAge, AnimalType, Gender } from '@/types/Animal';
import { BreedDropdown } from '@/app/components/Filters/BreedDropdown';
import { Dropdown } from '@/app/components/material/Dropdown';
import { Input } from '@/app/components/material/Input';

export const Filters = () => {
  const {
    type,
    setType,
    gender,
    setGender,
    age,
    setAge,
    name,
    setName,
    onFiltersApply,
  } = useAnimalsFiltersStore();

  const animalTypeOptions: BasicFilterOption<AnimalType>[] = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: null, label: 'Any' },
  ];

  const genderOptions: BasicFilterOption<Gender>[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'unknown', label: 'Unknown' },
  ];

  const ageOptions: BasicFilterOption<AnimalAge>[] = [
    { value: 'young', label: 'Young' },
    { value: 'adult', label: 'Adult' },
    { value: 'senior', label: 'Senior' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Radio
          caption={'Type'}
          value={type}
          onChange={setType}
          options={animalTypeOptions}
        />
        <BreedDropdown key={type} type={type} />
        <Dropdown
          caption="Gender"
          value={gender}
          onChange={setGender}
          options={genderOptions}
        />
        <Dropdown
          caption="Age"
          value={age}
          onChange={setAge}
          options={ageOptions}
        />
        <Input caption="Name" value={name || ''} onChange={setName} />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full self-end cursor-pointer"
        onClick={() => onFiltersApply()}
      >
        Apply
      </button>
    </div>
  );
};
