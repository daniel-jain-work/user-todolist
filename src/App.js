import React, { useEffect, useState } from 'react';

import IndividualUser from './components/user';
import generateAge from './utils/generateAge';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [usersList, setUsersList] = useState([]);

  const loadResource = async () => {
    const users = await fetch(API_URL).then(res => res.json());
    setUsersList(users.map(user => ({
      ...user,
      age: generateAge(),
    })));
  };

  useEffect(() => {
    loadResource();
  }, []);

  const handleUpdateName = (id, name) => {
    const newList = [...usersList];
    const index = newList.findIndex(user => user.id === id);
    if (index > -1) {
      newList[index].name = name;
      setUsersList([...newList]);
    }
  };

  return (
    <div>
      {usersList.map(user => (
        <IndividualUser
          key={user.id}
          user={user}
          handleUpdateName={handleUpdateName}
        />
      ))}
    </div>
  );
}
