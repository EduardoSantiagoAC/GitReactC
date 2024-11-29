import React from 'react';

const SearchBar = ({ search, onSearchChange, typeFilter, onTypeChange, classificationFilter, onClassificationChange }) => {
  return (
    <div className="bg-white shadow-md rounded-full py-4 px-6 flex justify-between items-center">
      <input
        type="text"
        placeholder="Buscar por nombre o descripción..."
        value={search}
        onChange={onSearchChange}
        className="flex-1 bg-transparent outline-none px-4 text-gray-600"
      />
      <select
        value={typeFilter}
        onChange={onTypeChange}
        className="ml-4 border border-gray-300 rounded-full px-4 py-2"
      >
        <option value="Todos">Todos</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>
      <select
        value={classificationFilter}
        onChange={onClassificationChange}
        className="ml-4 border border-gray-300 rounded-full px-4 py-2"
      >
        <option value="Todos">Todos</option>
        <option value="Compañía">Compañía</option>
        <option value="Terapia">Terapia</option>
        <option value="Apoyo">Apoyo</option>
      </select>
    </div>
  );
};

export default SearchBar;
