import { gql } from '@apollo/react-hooks';

// Query to get the phrases for the HeaderBanner
export const GET_BANNER_PHRASES = gql`
  query {
    bannerPhrases {
      id
      phrase
    }
  }
`;
