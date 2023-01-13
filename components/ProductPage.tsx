import React from 'react'
import Link from 'next/link'

export interface ProductProps { 
  image : { url: string }
  name: string
  slug: string
  price: number
}

const ProductPage = ({ image, name, slug, price }: ProductProps) => {
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <img
            src={image.url}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductPage;
