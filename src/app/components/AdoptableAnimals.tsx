import { FC } from 'react';
import { Card } from '@/app/components/Card';
import { useAnimalsFiltersStore } from '@/app/store/useAnimalsFiltersStore';
import { AnimalList } from '@/app/components/AnimalList';
import { useAnimalStore } from '@/app/store/useAnimalStore';

type Props = {};

export const AdoptableAnimals: FC<Props> = () => {
  const makeSearch = useAnimalsFiltersStore((store) => store.makeSearch);
  const totalPageCount = useAnimalsFiltersStore((store) => store.totalPages);
  const page = useAnimalsFiltersStore((store) => store.page);
  const isError = useAnimalStore((store) => store.isError);
  const animals = useAnimalStore((store) => store.animals);
  const isLoading = useAnimalStore((store) => store.loading);

  const onPageRequested = async () => {
    if (totalPageCount > page) {
      const nextPage = page + 1;
      await makeSearch({ paramsToOverride: { page: nextPage } });
    }
  };

  return (
    <AnimalList
      animals={animals}
      renderAnimalElement={(animal) => <Card key={animal.id} animal={animal} />}
      onPageRequested={onPageRequested}
      loading={isLoading}
      errorState={isError}
      retryFetch={makeSearch}
      renderNoResults={() => (
        <div className=" absolute left-0 bottom-0 right-0 top-0 flex justify-center items-center ">
          <video autoPlay muted playsInline loop>
            <source src="/animations/noResults.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    />
  );
};
