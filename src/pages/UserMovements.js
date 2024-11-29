import React from 'react';

const UserMovements = () => {
  const movements = [
    { id: 1, date: '2024-01-15', description: 'Pago por alquiler de Buddy', amount: -20 },
    { id: 2, date: '2024-01-10', description: 'Ingreso por servicio de terapias', amount: 50 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-primary-color mb-6">📊 Movimientos</h1>
        <ul className="bg-white shadow rounded-lg p-4">
          {movements.map((movement) => (
            <li key={movement.id} className="flex justify-between py-2 border-b last:border-0">
              <span>{movement.date}</span>
              <span>{movement.description}</span>
              <span
                className={`font-bold ${
                  movement.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {movement.amount > 0 ? '+' : ''}
                ${movement.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserMovements;
