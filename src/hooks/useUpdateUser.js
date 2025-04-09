import { useState, useCallback } from "react";

function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  const updateUser = useCallback(async (userId, updates) => {
    const baseUrl = "http://localhost:3000/users";
    const url = `${baseUrl}/${userId}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const result = await response.json();
      setUpdatedData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error("Error updating user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateUser, loading, error, updatedData };
}

export default useUpdateUser;
