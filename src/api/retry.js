export async function withRetry(fn, retries = 2) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    return withRetry(fn, retries - 1);
  }
}
