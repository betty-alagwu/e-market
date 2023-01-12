import React from "react";
import Link from "next/link";

interface FooterProps {
  discount: string;
  largeText: string;
  largeText2: string;
  saleTime: string;
  product: string;
  buttonText: string;
  midText: string;
  smallText: string;
  description: string;
  image: { url: string };
}
const FooterBanner = ({
  discount,
  largeText,
  largeText2,
  saleTime,
  midText,
  buttonText,
  product,
  smallText,
  description,
  image,
}: FooterProps) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p className="">{discount}</p>
          <h3 className="">{largeText}</h3>
          <h3 className="">{largeText2}</h3>
          <p className="">{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{description}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
              </div>
              <img 
                className="footer-banner-image"
                src={ image.url} />
      </div>
    </div>
  );
};

export default FooterBanner;
