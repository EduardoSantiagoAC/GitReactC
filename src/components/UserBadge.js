import React from 'react';

const UserBadge = ({ userType }) => {
  const badgeColors = {
    Cuidador: 'bg-green-500',
    Dueño: 'bg-blue-500',
    General: 'bg-gray-500',
  };

  return (
    <span
      className={`inline-block px-4 py-1 rounded-full text-white ${badgeColors[userType]}`}
    >
      {userType}
    </span>
  );
};

export default UserBadge;
