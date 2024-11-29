import React from 'react';

const categories = [
  { name: 'Perros', icon: '🐕' },
  { name: 'Gatos', icon: '🐈' },
  { name: 'Terapia', icon: '❤️' },
  { name: 'Apoyo', icon: '🤝' },
];

const Categories = () => {
  return (
    <div className="flex justify-between overflow-x-auto gap-4 py-4 px-6">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center text-center cursor-pointer"
        >
          <div className="text-2xl">{category.icon}</div>
          <div className="text-sm text-gray-600">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
