import { GraphQLClient } from 'graphql-request';

const API_URL = 'https://graphql.anilist.co';

export const graphqlClient = new GraphQLClient(API_URL);

// Common Anime fragment
export const ANIME_FRAGMENT = `
  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
      extraLarge
    }
    episodes
    status
    description
    genres
    averageScore
  }
`;
