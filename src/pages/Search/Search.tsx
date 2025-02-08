import React from 'react';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import * as dogs from '../../sdk/dogs';
import { useQuery } from '@tanstack/react-query';

interface SearchProps {}

export function Search({}: SearchProps) {
  const { data: breeds } = useQuery({
    queryKey: ['getBreeds'],
    queryFn: dogs.breeds,
  });
  return (
    <LayoutFrame>
      <ContentBox>Search</ContentBox>
    </LayoutFrame>
  );
}
