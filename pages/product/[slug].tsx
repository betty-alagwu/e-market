import { ProductPage } from "@/components";
import { fetchProducts } from "@/graphql/fetchProductQuery";
import { fetchSingleProduct } from "@/graphql/fetchSingleProductQuery";
import { Product } from "@/types/products";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiFillStar,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";


interface ProductDetailsProps {
  product: Product;
  products: Product[];
}


const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={product.images[index].url}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product.images.map((item, i) => (
              <img
                src={item.url}
                alt={product.name}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <ProductPage
                key={product.id}
                image={product.images[0]}
                slug={product.slug}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { product } = await fetchSingleProduct(ctx.query.slug as string);
  const productData = await fetchProducts();

  return {
    props: {
      product,
      products: productData.products,
    },
  };
}
export default ProductDetails;
