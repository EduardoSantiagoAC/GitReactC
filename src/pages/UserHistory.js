import React from 'react';

const UserHistory = () => {
  const history = [
    { id: 1, date: '2023-11-01', action: 'Mascota subida: Buddy' },
    { id: 2, date: '2023-11-10', action: 'Solicitud aprobada: Mimi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Historial</h1>
        {history.length > 0 ? (
          <ul className="space-y-4">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <p className="text-gray-600">{entry.action}</p>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay acciones en el historial.</p>
        )}
      </div>
    </div>
  );
};

export default UserHistory;

