import React from 'react';

const UserRequests = ({ requests }) => {
  const mockRequests = requests || [
    {
      id: 1,
      petName: 'Buddy',
      status: 'Aprobado',
      date: '2023-11-27',
      details: 'Cuidado para Juan Pérez.',
    },
    {
      id: 2,
      petName: 'Mimi',
      status: 'Pendiente',
      date: '2023-11-29',
      details: 'Cuidado solicitado para Ana López.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-8 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#F4E1D2] text-gray-800 text-center py-6 px-4">
          <h1 className="text-3xl font-semibold">Solicitudes Realizadas</h1>
          <p className="text-gray-600">Consulta el estado de tus solicitudes.</p>
        </div>
        <div className="p-6">
          {mockRequests.length > 0 ? (
            <ul className="space-y-6">
              {mockRequests.map((request) => (
                <li
                  key={request.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h2 className="text-xl font-bold text-gray-700">{request.petName}</h2>
                  <p className="text-gray-600">
                    <span className="font-semibold">Fecha:</span> {request.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Estado:</span> {request.status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Detalles:</span> {request.details}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No tienes solicitudes registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRequests;

    </div>
  );
};

export default UserRequests;
