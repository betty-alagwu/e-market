import { ProductPage } from "@/components";
import { AppStoreContext } from "@/Context/StateContext";
import { fetchProducts } from "@/graphql/fetchProductQuery";
import { fetchSingleProduct } from "@/graphql/fetchSingleProductQuery";
import { Product } from "@/types/products";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useState } from "react";
import { useStateContext } from "@/Context/StateContext";
import {
  AiOutlineMinus,
  AiFillStar,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { toast } from "react-hot-toast";

interface ProductDetailsProps {
  product: Product; //fetching single product
  products: Product[]; //fetching all products
}

const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItemToCart, cartItems, setShowCart } = useStateContext();



  const handleBuyNow = () => {
    addItemToCart({
      ...product, quantity: qty,
      image: product.images[index].url,
    }) //adding product to cart);
    setShowCart(true);
  };

  const isInCartAlready = cartItems.find((item) => item.name === product.name);

  console.log({ product });

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
            {product.images.map((image, i) => (
              <img
                src={image.url}
                alt={product.name}
                key={image.id}
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
              <button
                className="minus"
                disabled={qty === 1}
                onClick={function () {
                  setQty(qty - 1);
                }}
              >
                <AiOutlineMinus />
              </button>
              <span className="num">{qty}</span>
              <button
                className="plus"
                onClick={function () {
                  setQty(qty + 1);
                }}
              >
                <AiOutlinePlus />
              </button>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              disabled={isInCartAlready !== undefined}
              onClick={function () {
                addItemToCart({
                  name: product.name,
                  quantity: qty,
                  price: product.price,
                  image: product.images[0].url,
                  totalAvailable: product.totalAvailable,
                });
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
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
                // product={product}
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
