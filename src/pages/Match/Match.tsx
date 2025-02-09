import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import { useQuery } from '@tanstack/react-query';
import * as dogs from '../../sdk/dogs';
import invariant from 'ts-invariant';
import { Alert } from '../../components/Alert';
import { SpaceBetween } from '../../components/SpaceBetween';
import type { Dog } from '../../sdk/types';

export function Match() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  invariant(matchId, 'matchId nullish or undefined');

  const {
    data: match,
    error: matchError,
    isLoading: matchLoading,
  } = useQuery({
    queryKey: ['dogs', matchId],
    queryFn: () => dogs.listDogs({ ids: [matchId] }),
    select: res => res[0] as Dog,
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
            <SpaceBetween size="l" direction="horizontal">
              <img src={match.img} className="w-1/2" />
              <SpaceBetween size="m">
                <div>
                  <h2>{match.name}</h2>
                  <p className="text-lg text-gray-600">{match.breed}</p>
                </div>
                {/* This would localize horribly, but ideally a description of some sort
                would be available through a separate API! */}
                <p>
                  {match.name} is a {match.age} year old {match.breed}! Based on
                  your favorite dogs, we think {match.name} will be the perfect
                  companion for you!
                </p>
                <p>
                  {match.name} is located in zip code {match.zip_code}
                </p>
                <Link to="/search" className="button">
                  Return to search
                </Link>
              </SpaceBetween>
            </SpaceBetween>
          )}
        </SpaceBetween>
      </ContentBox>
    </LayoutFrame>
  );
}
