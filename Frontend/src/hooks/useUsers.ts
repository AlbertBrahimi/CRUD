import { useState, useEffect } from 'react';

interface User {
  id: number;
  name?: string;
  last_name?: string; 
  email?: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } 
    };

    fetchUsers();
  }, []);

  const addUser = async (newUser: User) => {
    try {
      const response = await fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, data]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:8081/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === updatedUser.id ? data : user))
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { users, addUser, updateUser, deleteUser, error };
};

export default useUsers;
