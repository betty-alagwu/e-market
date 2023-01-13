import { Banner } from '@/types/banner'
import { gql} from 'graphql-request'
import { client } from './client'

const bannerQuery = gql`
{
  banners {
    id
    buttonText
    product
    image{
      url
    }
    description
    smallText
    midText
    largeText
    largeText2
    discount 
    saleTime
    updatedAt
    updatedBy {
      id
      name
    }
  }
}
`

export async function fetchBanner() { 
  return client.request<{banners: Banner[]}>(bannerQuery)
}
