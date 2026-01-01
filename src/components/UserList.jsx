import React, { useEffect, useState } from "react";
import { getUserData } from "../api/userService";

const UserList = () => {
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMount = true;
    async function getUsers() {
      try {
        if (isMount) {
          const userData = await getUserData();
          localStorage.setItem("users", JSON.stringify(userData));
          setUser(userData);
        }
      } catch (error) {
        //using fallback
        if (isMount) {
          setErr(error.message);
          const catchedData = JSON.parse(localStorage.getItem("users") || `[]`);
          setUser(catchedData);
        }
      } finally {
        if (isMount) {
          setLoading(false);
        }
      }
    }
    getUsers();

    // below return is for cleanup
    return () => {
      isMount = false;
    };
  }, []);

  if (loading) return <p>Loading.....</p>;
  if (err) return <p>{err}</p>;
  return (
    <div>
      <ol>
        {user.map((data) => {
          return <li key={data.id}>{data.name}</li>;
        })}
      </ol>
    </div>
  );
};

export default UserList;
