import apiClient from "./apiClient";
import { withRetry } from "./retry";

//get user Data with error handling retry method

export async function getUserData() {
  try {
    const users = await withRetry(() => apiClient.get("/users"));
    return users;
  } catch (error) {
    throw error;
  }
}

//get user Post with error handling retry method
export async function getPosts() {
  try {
    const posts = await withRetry(() => apiClient.get("/posts"));
    return posts;
  } catch (err) {
    throw err;
  }
}
