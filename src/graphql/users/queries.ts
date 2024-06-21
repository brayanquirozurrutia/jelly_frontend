import { gql } from '@apollo/react-hooks';

// Query to get user details
export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    getUser(id: $id) {
    email
    fullname
    }
  }
`;
