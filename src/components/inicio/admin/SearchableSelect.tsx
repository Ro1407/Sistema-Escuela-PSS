import React, { useState } from 'react';
import { Curso } from '../../../../prisma/interfaces';

const SearchableSelect = ({ options, onSelect } : {options: Curso[], onSelect: any}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredOptions = options.filter(option => 
    option.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Curso) => {
    onSelect(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Buscar..."
        className="border rounded p-2 w-full"
      />
      {isOpen && (
        <ul className="absolute bg-white border mt-1 w-full z-10 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {option.nombre}
              </li>
            ))
          ) : (
            <li className="p-2">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;