import React from 'react';

const UserHistory = ({ history }) => {
  const mockHistory = history || [
    {
      id: 1,
      petName: 'Buddy',
      date: '2023-11-25',
      action: 'Cuidado completado',
      details: 'Cuidado para Juan Pérez.',
    },
    {
      id: 2,
      petName: 'Mimi',
      date: '2023-11-20',
      action: 'Mascota alquilada',
      details: 'Alquilada por Ana López.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-8 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#F4E1D2] text-gray-800 text-center py-6 px-4">
          <h1 className="text-3xl font-semibold">Historial de Actividades</h1>
          <p className="text-gray-600">Consulta las actividades realizadas con tus mascotas.</p>
        </div>
        <div className="p-6">
          {mockHistory.length > 0 ? (
            <ul className="space-y-6">
              {mockHistory.map((entry) => (
                <li
                  key={entry.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h2 className="text-xl font-bold text-gray-700">{entry.petName}</h2>
                  <p className="text-gray-600">
                    <span className="font-semibold">Fecha:</span> {entry.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Acción:</span> {entry.action}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Detalles:</span> {entry.details}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No tienes actividades registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;

