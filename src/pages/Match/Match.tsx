import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import { useQuery } from '@tanstack/react-query';
import * as DogQueries from '../../sdk/DogQueries';
import * as LocationQueries from '../../sdk/LocationQueries';
import { invariant } from 'ts-invariant';
import { Alert } from '../../components/Alert';
import { SpaceBetween } from '../../components/SpaceBetween';
import type { Dog } from '../../sdk/types';

export function Match() {
  const { matchId } = useParams();
  invariant(matchId, 'matchId nullish or undefined');

  const {
    data: match,
    error: matchError,
    isLoading: matchLoading,
  } = useQuery({
    ...DogQueries.listDogsById({ ids: [matchId] }),
    select: res => res[0] as Dog,
  });

  const { data: location } = useQuery({
    ...LocationQueries.zipSearch({ zipCodes: [match?.zip_code ?? ''] }),
    enabled: !!match?.zip_code,
    select: locations => locations.get(match?.zip_code ?? ''),
  });

  return (
    <LayoutFrame>
      <ContentBox className="w-full">
        <SpaceBetween size="m">
          <div>
            <h1>Your match</h1>
            <p>We found your perfect match using the dogs you loved!</p>
          </div>
          {matchLoading && 'Loading...'}
          {matchError && (
            <Alert type="error" title="Unable to find match">
              Something went wrong finding your match. Refresh to try again or
              return to search <Link to="/search">here</Link>
            </Alert>
          )}
          {match && (
            <div className="flex flex-col md:flex-row gap-5 md:gap-10">
              <img
                src={match.img}
                className="w-full md:max-w-1/2 object-contain"
              />
              <SpaceBetween size="m">
                <div>
                  <h2>{match.name}</h2>
                  <p className="text-lg text-gray-600">{match.breed}</p>
                </div>
                {/* This would localize horribly, but ideally a description of some sort
                would be available through a separate API */}
                <p>
                  {match.name} is a {match.age} year old {match.breed}! Based on
                  your favorite dogs, we think {match.name} will be the perfect
                  companion for you!
                </p>
                <p>
                  {match.name} is located in{' '}
                  {location
                    ? `${location.city}, ${location.state} ${location.zip_code}`
                    : `zip code ${match.zip_code}`}
                </p>
                <Link to="/search" className="button">
                  Return to search
                </Link>
              </SpaceBetween>
            </div>
          )}
        </SpaceBetween>
      </ContentBox>
    </LayoutFrame>
  );
}
