import { fetchBanner } from "@/graphql/fetchBannerQuery";
import { fetchProducts } from "@/graphql/fetchProductQuery";
import { fetchSingleProduct } from "@/graphql/fetchSingleProductQuery";
import { Product } from "@/types/products";
import { GetServerSidePropsContext } from "next";
import React from "react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <h1>${product.price}</h1>
          <div className="image-container">
            {product.images.map((image) => (
              <img key={image.url} src={image.url} alt={product.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { product } = await fetchSingleProduct(ctx.query.slug as string);

  return {
    props: {
      product,
    },
  };
}

export default ProductDetails;