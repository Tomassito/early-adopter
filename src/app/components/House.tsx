import { FC } from 'react';
import styles from './House.module.css';
import 'simplebar-react/dist/simplebar.min.css';
import { AdoptableAnimals } from '@/app/components/AdoptableAnimals';
import { Filters } from '@/app/components/Filters';
import { FavouritePets } from '@/app/components/FavouritePets';

type Props = {};

export const House: FC<Props> = ({}) => {
  return (
    <div>
      <div
        className={`${styles.roof} bg-red-800 w-full h-0 rounded-xs p-[100px] mb-1`}
      ></div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 min-h-60">
          <div className="bg-sky-700 min-w-5/12 rounded-xs p-3 md:p-4 relative">
            <FavouritePets />
          </div>
          <div className="bg-teal-700 min-w-7/12 rounded-xs  p-2 md:p-4">
            <div className="bg-[url(/images/adopted_cat_and_dog.jpg)] h-full bg-cover bg-center saturate-[0.7]"></div>
          </div>
        </div>
        <div className="flex gap-1 min-h-110 max-h-110">
          <div className="bg-yellow-700 min-w-7/12 rounded-xs p-2 md:p-4 ">
            <AdoptableAnimals />
          </div>
          <div className="bg-purple-700 min-w-5/12 rounded-xs p-2 md:p-4">
            <Filters />
          </div>
        </div>
        <div
          className={`${styles.foundation} bg-amber-100 w-full h-7 rounded-xs`}
        />
      </div>
    </div>
  );
};
