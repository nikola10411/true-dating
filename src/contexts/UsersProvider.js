import { createContext, useCallback, useContext, useState } from 'react';
import { getAllUsers } from '../services/user';

const UsersContext = createContext();
export const useUsers = () => useContext(UsersContext);

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const loadUsers = useCallback(async () => {
    console.log('called users')
    setLoading(true);
    try {
      const users = await getAllUsers();
      if (users.length) {
        setUsers(users);
      }
      setUsersLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, usersLoaded, loadUsers, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
