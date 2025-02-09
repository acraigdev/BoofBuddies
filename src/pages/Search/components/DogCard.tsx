import React from 'react';
import type { Dog } from '../../../sdk/types';
import { useFavoriteDogContext } from '../../../utils/FavoriteDogContext';
import { Icons } from '../../../components/Icons';

export function DogCard({ id, age, breed, img, name, zip_code }: Dog) {
  const { favoriteDogs, addFavoriteDog, removeFavoriteDog } =
    useFavoriteDogContext();

  const isFavoriteDog = favoriteDogs.has(id);

  return (
    <div
      className={`${isFavoriteDog && 'bg-blue-100'} border border-gray-light shadow-lg p-2 rounded-lg relative`}
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
      <p>Breed: {breed}</p>
      <p>
        Age: {age === 0 ? '< 1 year' : age === 1 ? '1 year' : `${age} years`}
      </p>
      <p>Location: {zip_code}</p>
    </div>
  );
}
