interface Image {
  id: string
  url: string
}

export interface Product {
  map: any;
  id: string;
  name: string;
  slug: string;
  images: Image[];
  price: number;
  details: string;
}
