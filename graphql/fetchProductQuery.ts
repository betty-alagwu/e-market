import { Product } from '@/types/products'
import { gql } from 'graphql-request'
import { client } from './client'

const getProductsQuery = gql`
{
  products {
    id
    name
    slug
    images {
      url
    }
    price
    details
    updatedAt
    updatedBy {
      id
      name
    }
  }
}
`

interface FetchProductsData {
  products: Product[]
}

export function fetchProducts() {
  return client.request<FetchProductsData>(getProductsQuery)
}
