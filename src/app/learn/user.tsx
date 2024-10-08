import React from "react";

const fetchUser = async () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

const User = async () => {
  const data = await fetchUser();
  return <div>User data</div>;
};

export default User;
