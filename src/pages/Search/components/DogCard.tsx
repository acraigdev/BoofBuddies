import React from 'react';
import type { Dog, DogLocation } from '../../../sdk/types';
import { useFavoriteDogContext } from '../../../utils/FavoriteDogContext';
import { Icons } from '../../../components/Icons';
import type { Maybe } from '../../../utils/typeHelpers';

interface DogCardProps extends Dog {
  location: Maybe<DogLocation>;
}

export function DogCard({
  id,
  age,
  breed,
  img,
  name,
  zip_code,
  location,
}: DogCardProps) {
  const { favoriteDogs, addFavoriteDog, removeFavoriteDog } =
    useFavoriteDogContext();

  const isFavoriteDog = favoriteDogs.has(id);

  return (
    <div
      className={`${isFavoriteDog && 'bg-blue-100'} border border-gray-light shadow-lg p-4 rounded-lg relative`}
    >
      <button
        className={`${isFavoriteDog ? 'bg-blue' : 'border border-gray-200 bg-gray-100'} inline-block rounded-full absolute right-1 top-1 p-2 cursor-pointer`}
        onClick={() =>
          isFavoriteDog ? removeFavoriteDog(id) : addFavoriteDog(id)
        }
      >
        <Icons.Star
          className={`${isFavoriteDog ? 'fill-white stroke-white' : 'stroke-1'} size-7`}
        />
      </button>
      <img
        src={img}
        loading="lazy"
        className="rounded-lg w-full object-cover mb-2 aspect-square"
      />
      <h5>{name}</h5>
      <p className="text-gray-500">{breed}</p>
      <span className="text-sm block">
        {age === 0 ? 'Puppy' : age === 1 ? '1 year old' : `${age} years old`}
      </span>
      <span className="text-sm block">
        {location
          ? `${location.city}, ${location.state} ${location?.zip_code}`
          : zip_code}
      </span>
    </div>
  );
}
