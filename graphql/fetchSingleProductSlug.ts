import { Product } from '@/types/products'
import { gql } from 'graphql-request'
import { client } from './client'

const getSingleProductQuery = gql`
 query FetchSingleProduct () {
  product {
    slug
  }
}
`

interface FetchProductData {
  product: Product
}

export function fetchSingleProduct(slug: string) {
  return client.request<FetchProductData>(getSingleProductQuery, {slug})
}