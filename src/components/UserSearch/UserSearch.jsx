"use client";

import { useState } from "react";

export const UserSearch = ({ users, onSelectUser, onSearchChange }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setSuggestedUsers(filteredUsers);

    // Chame a função de mudança de pesquisa fornecida por propriedade
    onSearchChange(query);
  };

  const handleUserSelect = (user) => {
    // Chame a função de seleção de usuário fornecida por propriedade
    onSelectUser(user);
    setSearchText("");
  };

  return (
    <div>
      <div className="relative">
        <input
          className="inputSombra pAlata"
          placeholder="Pesquisa"
          type="text"
          value={searchText}
          onChange={handleSearchChange}
        />
        {suggestedUsers.length > 0 && (
          <ul className="absolute z-10 bg-white dark:bg-[#333] border border-gray-300 dark:border-gray-700 w-full mt-2 rounded-md overflow-hidden shadow-md">
            {suggestedUsers.map((user) => (
              <li
                key={user.id}
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
