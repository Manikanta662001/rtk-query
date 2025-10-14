import React from "react";
import {
  useAddProductMutation,
  useLazyGetProductByIdQuery,
  useGetProductsQuery,
} from "./products_api";

function ProductsCompo() {
  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const [
    trigger,
    { data: dataById, error: errorById, isLoading: loadingById },
  ] = useLazyGetProductByIdQuery();

  const [
    addProduct,
    {
      isLoading: addProductIsLoading,
      error: addProductError,
      isSuccess: addProductIsSuccess,
    },
  ] = useAddProductMutation();

  const handleGetProductById = () => {
    trigger(5);
  };

  const handleAddProduct = async () => {
    await addProduct({
      id: 100,
      title: "Mani Product",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <h1>Error occurred</h1>
        <button onClick={refetch}>
          {isLoading ? "Loading......" : "Refetch Products"}
        </button>
      </div>
    );
  console.log("DATA::::", data, addProductError);
  return (
    <div>
      <h1>ProductsComponent</h1>
      <button onClick={handleAddProduct}>
        {addProductIsLoading ? "Loading....." : "Add New Product"}
      </button>
      <button onClick={handleGetProductById}>
        {loadingById ? "Loading......" : "get Product By ID"}
      </button>
      {addProductIsSuccess && <div>Product Added Successfully</div>}
      {addProductError && <div>{addProductError?.status}</div>}
      {data?.map((item: any) => (
        <div
          key={item.id}
          style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default ProductsCompo;
