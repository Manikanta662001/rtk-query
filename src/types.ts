export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
};
