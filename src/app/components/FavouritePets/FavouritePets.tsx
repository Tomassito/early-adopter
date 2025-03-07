import { useFavoritesStore } from '@/app/store/useFavoritesStore';
import { Card } from '@/app/components/Card';
import { AnimalList } from '@/app/components/AnimalList';
import { FC, useEffect } from 'react';
import { fetcher } from '@/_baseService/helpers';
import animalsApi from '@/_api/animals';
import { AnimalResponse } from '@/_api/animals/types';
import useSWR from 'swr';
import { Tooltip } from '@/app/components/material/Tooltip/Tooltip';

type Props = {};

export const FavouritePets: FC<Props> = () => {
  const { favouritePetsById, favouritePetIds, errorCount } =
    useFavoritesStore();
  const animals = Object.values(favouritePetsById);

  const isLoading =
    Object.keys(favouritePetsById).length + errorCount !==
    favouritePetIds.length;

  const pages = [];
  for (let i = 0; i < favouritePetIds.length; i++) {
    pages.push(<Empty id={favouritePetIds[i]} key={i} />);
  }

  return (
    <div className="h-full flex flex-col">
      {errorCount > 0 && (
        <div className="absolute top-1 right-1 z-10">
          <Tooltip
            message={`There ${errorCount > 1 ? 'were' : 'was'} ${errorCount} item ${errorCount > 1 ? 's' : ''} which we could not retrieve`}
          >
            <div className="font-black text-red-700 text-[1.2rem] border-2 border-red-700 rounded-4xl h-[min(1.6em,6vw)] leading-[1.5em] aspect-square flex justify-center items-center">
              !
            </div>
          </Tooltip>
        </div>
      )}
      <div className="z-1 h-full">
        <AnimalList
          animals={animals}
          loading={isLoading}
          renderAnimalElement={(animal) => (
            <Card key={animal.id} animal={animal} />
          )}
        />
      </div>
      {/*star background*/}
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-yellow-300 opacity-[.1] max-w-[208px] aspect-square mx-auto self-center "
        style={{
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
      ></div>
      {pages}
    </div>
  );
};

/*
 Pattern as described in https://swr.vercel.app/docs/pagination#advanced-cases
 */
const Empty = ({ id }: { id: number }) => {
  const { data, error } = useSWR<AnimalResponse>(
    animalsApi.animal(id),
    fetcher,
    { shouldRetryOnError: false },
  );
  const { addFavouritePet, addToErrorCount } = useFavoritesStore();
  useEffect(() => {
    if (data) {
      addFavouritePet(data.animal);
    } else if (error) {
      addToErrorCount();
    }
  }, [data, error, addFavouritePet, addToErrorCount]);
  return null;
};
