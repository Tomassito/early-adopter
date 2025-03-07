import { Dropdown } from '@/app/components/material/Dropdown';
import { AnimalType } from '@/types/Animal';
import { FC, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import animals from '@/_api/animals';
import { BreedsResponse } from '@/_api/animals/types';
import { useAnimalsFiltersStore } from '@/app/store/useAnimalsFiltersStore';

type Props = {
  type: AnimalType;
};

export const BreedDropdown: FC<Props> = ({ type }) => {
  const { breed, setBreed } = useAnimalsFiltersStore();

  useEffect(() => {
    setBreed(null);
  }, [type, setBreed]);

  if (type) {
    // fetch breeds per type - good to cache it
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading } = useSWR<BreedsResponse>(animals.breedList(type));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const options = useMemo(
      () =>
        data?.breeds.map(({ name: breedName }) => ({
          label: breedName,
          value: breedName,
        })) ?? [],
      [data],
    );

    return (
      <Dropdown
        value={breed}
        onChange={setBreed}
        options={options}
        caption="Breed"
        isLoading={isLoading}
      />
    );
  } else {
    return (
      <Dropdown disabled disabledMessage="Select type first" caption="Breed" />
    );
  }
};
