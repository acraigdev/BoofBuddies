import { fetchApiClient } from './client';

// export const zipSearch = async ({ zipcodes }: { zipcodes: Array<string> }) => {
//   return await fetchApiClient.post({
//     api: '/locations',
//     input: { body: zipcodes },
//   });
// };

// The following body parameters can be supplied to filter the search results. All are optional; if none are provided, the search will match all locations.

// city - the full or partial name of a city
// states - an array of two-letter state/territory abbreviations
// geoBoundingBox - an object defining a geographic bounding box:
// This object must contain one of the following combinations of properties:
// top, left, bottom, right
// bottom_left, top_right
// bottom_right, top_left
// Each property should have the following data:
// lat - latitude
// lon - longitude
// Additionally, the following body parameters can be used to configure the search:

// size - the number of results to return; defaults to 25 if omitted
// from - a cursor to be used when paginating results (optional)
// The maximum total number of ZIP codes that will be matched by a single query is 10,000.
// TODO
// export const locationSearch = async ({
//   zipcodes,
// }: {
//   zipcodes: Array<string>;
// }) => {
//   return await fetchApiClient.post({
//     api: '/locations/search',
//     input: { body: zipcodes },
//   });
// };
