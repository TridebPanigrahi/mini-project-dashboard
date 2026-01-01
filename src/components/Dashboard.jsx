import React, { useEffect, useState } from "react";
import { getPosts, getUserData } from "../api/userService";

const Dashboard = () => {
  const [data, setData] = useState({
    userCount: 0,
    postCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let isMount = true;
    async function dashboardData() {
      try {
        if (isMount) {
          // used Promise.all for parallel call of both the apis
          const [users, posts] = await Promise.all([getUserData(), getPosts()]);
          setData({
            userCount: users.length,
            postCount: posts.length,
          });
        }
      } catch (error) {
        if (isMount) {
          //hendeled fallback after retry
          const userData = JSON.parse(localStorage.getItem("users") || "[]");
          setData({
            userCount: userData.length,
            postCount: 0,
          });
          setErr("Showing cached Data");
        }
      } finally {
        if (isMount) {
          setLoading(false);
        }
      }
    }
    dashboardData();

    // the below return is for cleanup
    return () => {
      isMount = false;
    };
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <div>
      <h4>Dashboard</h4>
      <p>User Count: {data.userCount}</p>
      <p>Post Count: {data.postCount}</p>
    </div>
  );
};

export default Dashboard;
