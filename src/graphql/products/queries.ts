import { gql } from '@apollo/react-hooks';

// Query to get all products
export const GET_PRODUCTS = gql`
  query {
    listProducts {
      id
      name
      price
      image
      group {
        name
      }
      category {
        name
      }
    }
  }
`;
