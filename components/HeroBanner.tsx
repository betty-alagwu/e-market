import Link from "next/link";
import React from "react";

interface HeroBannerProps {
  subTitle: string;
  tittle: string;
  largeText: string
  buttonText: string;
  image: string;
  description: string;
  product: string;
}

const HeroBanner = ({
  subTitle,
  tittle,
  largeText,
  buttonText,
  image,
  description,
  product
}: HeroBannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{subTitle}</p>
        <h3>{tittle}</h3>
        <h1>{largeText}</h1>
        <img src={image} alt="headphones" className="hero-banner-image" />
      </div>
      <div className="">
        <Link href={`/product/${product}`}>
          <button type="button">{buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
