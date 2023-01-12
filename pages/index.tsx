import React from "react";
import Rd from "react-dom/server";
import {
  FooterBanner,
  HeroBanner,
  Navbar,
  Footer,
  ProductPage,
} from "@/components";
import { fetchProducts } from "@/graphql/fetchProductQuery";
import { fetchBanner } from "@/graphql/fetchBannerQuery";
import { Banner } from "@/types/banner";
import { Product } from "@/types/products";

export interface HomeProps {
  products: Product[];
  banner: Banner;
}

const Home = ({ products, banner }: HomeProps) => {
  return (
    <>
      <HeroBanner
        tittle={banner.midText}
        image={banner.image.url}
        buttonText={banner.buttonText}
        description={banner.description}
        subTitle={banner.smallText}
        largeText={banner.largeText}
        product={banner.product}
      />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speaker There are many varitions passages</p>
      </div>
      <div className="products-container">
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

      <FooterBanner
        discount={banner && banner.discount}
        largeText={banner.largeText}
        largeText2={banner.largeText2}
        saleTime={banner.saleTime}
        buttonText={banner.buttonText}
        midText={banner.midText}
        product={banner.product}
        smallText={banner.smallText}
        description={banner.description}
        image={banner.image}
      />
    </>
  );
};

export async function getServerSideProps() {
  const productData = await fetchProducts();
  const bannerData = await fetchBanner();

  return {
    props: {
      products: productData.products,
      banner: bannerData.banners[0] || null,
    },
  };
}

export default Home;
