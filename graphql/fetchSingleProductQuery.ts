import { Product } from '@/types/products'
import { gql } from 'graphql-request'
import { client } from './client'

const getSingleProductQuery = gql`
 query FetchSingleProduct ($slug: String!) {
  product(where: { slug:  $slug}) {
    id
    slug
    name
    price
    totalAvailable
    images {
     id
      url
    }
    updatedAt
    details
  }
}
`

interface FetchProductData {
  product: Product
}

export function fetchSingleProduct(slug: string) {
  return client.request<FetchProductData>(getSingleProductQuery, {slug})
}
