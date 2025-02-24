import type { Nullable } from '../utils/typeHelpers';

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchDogResult {
  dogs: Array<Dog>;
  next?: string;
}

export type Filters = {
  pageSize: number;
  zipCodes: Set<string>;
  age: Nullable<{ min?: Nullable<number>; max?: Nullable<number> }>;
  breeds: Set<string>;
};

export interface DogLocation {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
export interface Coordinates {
  lat: number;
  lon: number;
}
