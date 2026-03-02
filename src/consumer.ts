import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string
}

export const fetchUser = async (baseUrl: string, id: number): Promise<User> => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  return response.data;
};