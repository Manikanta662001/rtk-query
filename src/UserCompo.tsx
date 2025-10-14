import React from "react";
import { useGetUsersQuery } from "./api";
import { useAddUserMutation, useLazyGetUserByIdQuery } from "./users_api";

function UserCompo() {
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const [
    trigger,
    { data: dataById, error: errorById, isLoading: loadingById },
  ] = useLazyGetUserByIdQuery();

  const [
    addUser,
    {
      isLoading: addUserIsLoading,
      error: addUserError,
      isSuccess: addUserIsSuccess,
    },
  ] = useAddUserMutation();

  const handleGetUserById = () => {
    trigger(5);
  };

  const handleAddUser = async () => {
    await addUser({
      id: 100,
      username: "Mani User",
      email: "mani@gmail.com",
      password: "string",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <h1>Error occurred</h1>
        <button onClick={refetch}>
          {isLoading ? "Loading......" : "Refetch Users"}
        </button>
      </div>
    );
  return (
    <div>
      <h1>UsersComponent</h1>
      <button onClick={handleAddUser}>
        {addUserIsLoading ? "Loading....." : "Add New User"}
      </button>
      <button onClick={handleGetUserById}>
        {loadingById ? "Loading......" : "get user By ID"}
      </button>
      {addUserIsSuccess && <div>User Added Successfully</div>}
      {addUserError && <div>{addUserError?.status}</div>}
      {data?.map((item: any) => (
        <div
          key={item.id}
          style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
        >
          {item.username} - {item.email}
        </div>
      ))}
    </div>
  );
}

export default UserCompo;
