import { gql } from '@apollo/react-hooks';

// Query to get all products without pagination
export const GET_PRODUCTS_WITHOUT_PAGINATION = gql`
  query {
    listProductsWithoutPagination {
      id
      name
      price
      image
      discountPrice
      isDisabled
      group {
        name
      }
      category {
        name
      }
    }
  }
`;

// Query to get product ids and names
export const GET_PRODUCT_IDS_AND_NAMES = gql`
  query {
    listProductsWithoutPagination {
      id
      name
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
      discountPrice
      stock
      group {
        id
        name
      }
      category {
        id
        name
      }
      images {
        id
        image
      }
      productVersion {
        id
        name
        stock
        isDisabled
      }
    }
  }
`;

// Query to get all products
export const GET_PRODUCTS = gql`
    query ListProducts($search: String, $page: Int, $pageSize: Int) {
        listProducts(search: $search, page: $page, pageSize: $pageSize) {
            id
            name
            description
            price
            stock
            image
            group {
                id
            }
            category {
                id
            }
        }
        totalProducts(search: $search)
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

// Query to get all groups without pagination
export const GET_GROUPS_WITHOUT_PAGINATION = gql`
    query ListGroupsWithoutPagination {
        listGroupsWithoutPagination {
            id
            name
        }
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

// Query to get all categories without pagination
export const GET_CATEGORIES_WITHOUT_PAGINATION = gql`
    query ListCategoriesWithoutPagination {
        listCategoriesWithoutPagination {
            id
            name
        }
    }
    `;

export const GET_PRODUCT_IMAGES_FILES = gql`
    query listProductImageFileTypeByProductId($productId: ID!) {
        listProductImageFileTypeByProductId(productId: $productId) {
            image
        }
    }
`;
