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

// Query to get all groups
export const GET_GROUPS = gql`
  query ListGroups($search: String, $page: Int, $pageSize: Int) {
    listGroups(search: $search, page: $page, pageSize: $pageSize) {
      id
      name
      description
    }
    totalGroups(search: $search)
  }
`;

// Query to get all categories
export const GET_CATEGORIES = gql`
  query ListCategories($search: String, $page: Int, $pageSize: Int) {
    listCategories(search: $search, page: $page, pageSize: $pageSize) {
      id
      name
      description
    }
    totalCategories(search: $search)
  }
`;
