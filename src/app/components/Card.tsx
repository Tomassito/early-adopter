import { Animal } from '@/types/Animal';
import { FC, useState } from 'react';
import Image from 'next/image';
import { useFavoritesStore } from '@/app/store/useFavoritesStore';
import { useShallow } from 'zustand/react/shallow';

type Props = {
  animal: Animal;
};

export const Card: FC<Props> = ({ animal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavouritePet, removeFavouritePet, favouritePetsById } =
    useFavoritesStore(
      useShallow(
        ({ addFavouritePet, removeFavouritePet, favouritePetsById, ..._ }) => ({
          addFavouritePet,
          removeFavouritePet,
          favouritePetsById,
        }),
      ),
    );

  const isFav = !!favouritePetsById[animal.id];
  const onFavToggleClick = () =>
    favouritePetsById[animal.id]
      ? removeFavouritePet(animal)
      : addFavouritePet(animal, true);

  return (
    <div className="relative group/card">
      <Image
        src={animal.primary_photo_cropped?.small || '/images/placeholder.jpg'}
        alt={"Animal's photo"}
        width={100}
        height={100}
        className="rounded-4xl h-[100px] object-cover"
      />
      <div
        className="absolute top-0 right-0 bg-black rounded-full cursor-pointer opacity-0 group/icon group-hover/card:opacity-100 group-active/card:opacity-100 transition"
        onClick={isHovered ? onFavToggleClick : undefined}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-yellow-300 w-6 aspect-square mx-auto self-center group-hover/icon:scale-110 transition`}
          style={{
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            opacity: isFav ? 1 : 0.6,
          }}
        ></div>
      </div>
    </div>
  );
};
