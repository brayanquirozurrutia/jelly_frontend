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

// Query to get product details
export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      image
      description
      group {
        name
      }
      category {
        name
      }
    }
  }
`;
