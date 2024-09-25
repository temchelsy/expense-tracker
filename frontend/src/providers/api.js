import { API_BASE_URL } from "../contants/contants";

const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Protected data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
};

export {
  fetchCurrentUser
}