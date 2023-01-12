interface Image {
  id: string
  url: string
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  images: Image[];
  price: number;
  details: string;
}
