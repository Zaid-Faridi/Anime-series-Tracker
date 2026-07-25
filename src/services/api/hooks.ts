import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { graphqlClient, ANIME_FRAGMENT } from './client';

const TRENDING_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        ...AnimeFields
      }
    }
  }
`;

const POPULAR_SEASON_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, status: RELEASING) {
        ...AnimeFields
      }
    }
  }
`;

const TOP_RATED_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: SCORE_DESC) {
        ...AnimeFields
      }
    }
  }
`;

const UPCOMING_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, status: NOT_YET_RELEASED) {
        ...AnimeFields
      }
    }
  }
`;

const GENRE_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int, $genre: String) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, genre: $genre) {
        ...AnimeFields
      }
    }
  }
`;

const SEARCH_ANIME_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($page: Int, $search: String) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, search: $search) {
        ...AnimeFields
      }
    }
  }
`;

const ANIME_DETAIL_QUERY = gql`
  ${ANIME_FRAGMENT}
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeFields
      bannerImage
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
    }
  }
`;

export const useTrendingAnime = () => {
  return useInfiniteQuery({
    queryKey: ['trendingAnime'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(TRENDING_ANIME_QUERY, { page: pageParam });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

export const usePopularSeasonAnime = () => {
  return useInfiniteQuery({
    queryKey: ['popularSeasonAnime'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(POPULAR_SEASON_ANIME_QUERY, { page: pageParam });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

export const useTopRatedAnime = () => {
  return useInfiniteQuery({
    queryKey: ['topRatedAnime'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(TOP_RATED_ANIME_QUERY, { page: pageParam });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

export const useUpcomingAnime = () => {
  return useInfiniteQuery({
    queryKey: ['upcomingAnime'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(UPCOMING_ANIME_QUERY, { page: pageParam });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

export const useGenreAnime = (genre: string) => {
  return useInfiniteQuery({
    queryKey: ['genreAnime', genre],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(GENRE_ANIME_QUERY, { page: pageParam, genre });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
  });
};

export const useSearchAnime = (searchQuery: string) => {
  return useInfiniteQuery({
    queryKey: ['searchAnime', searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphqlClient.request<any>(SEARCH_ANIME_QUERY, { page: pageParam, search: searchQuery });
      return data.Page;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!searchQuery,
  });
};

export const useAnimeDetail = (id: number) => {
  return useQuery({
    queryKey: ['animeDetail', id],
    queryFn: async () => {
      const data = await graphqlClient.request<any>(ANIME_DETAIL_QUERY, { id });
      return data.Media;
    },
    enabled: !!id,
  });
};
