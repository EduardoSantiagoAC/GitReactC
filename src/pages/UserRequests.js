import React from 'react';

const UserRequests = ({ requests }) => {
  const mockRequests = requests || [
    {
      id: 1,
      petName: 'Biscuit',
      status: 'Aprobado',
      date: '2023-11-27',
      details: 'Cuidado para Juan Pérez.',
    },
    {
      id: 2,
      petName: 'Bigotes',
      status: 'Pendiente',
      date: '2023-11-29',
      details: 'Cuidado solicitado para Ana López.',
    },
    {
      id: 3,
      petName: 'Virus',
      status: 'Aprobado',
      date: '2023-11-30',
      details: 'Cuidado solicitado para Carlos Díaz.',
    },
    {
      id: 4,
      petName: 'Apache',
      status: 'Pendiente',
      date: '2023-12-01',
      details: 'Cuidado solicitado para María González.',
    },
    {
      id: 5,
      petName: 'Doggy',
      status: 'Aprobado',
      date: '2023-12-02',
      details: 'Cuidado para Luis Pérez.',
    },
    {
      id: 6,
      petName: 'Luna',
      status: 'Pendiente',
      date: '2023-12-03',
      details: 'Cuidado solicitado para Ana Ruiz.',
    },
    {
      id: 7,
      petName: 'Doge',
      status: 'Aprobado',
      date: '2023-12-04',
      details: 'Cuidado para Pedro Sánchez.',
    },
    {
      id: 8,
      petName: 'Carnitas',
      status: 'Pendiente',
      date: '2023-12-05',
      details: 'Cuidado solicitado para Patricia López.',
    },
    {
      id: 9,
      petName: 'Kira',
      status: 'Aprobado',
      date: '2023-12-06',
      details: 'Cuidado para Juliana Martínez.',
    },
    {
      id: 10,
      petName: 'Snowy',
      status: 'Pendiente',
      date: '2023-12-07',
      details: 'Cuidado solicitado para Roberto García.',
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
