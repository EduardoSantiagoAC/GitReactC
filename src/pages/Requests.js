import React from 'react';

const requests = [
  { id: 1, petName: 'Biscuit', status: 'Pendiente', user: 'Carlos Gómez' },
  { id: 2, petName: 'Bigotes', status: 'Aprobada', user: 'Lucía Pérez' },
];

const Requests = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-primary-color">Solicitudes</h1>
        <div className="bg-white rounded shadow p-6">
          {requests.map((req) => (
            <div key={req.id} className="border-b py-4">
              <p className="text-lg font-bold">Mascota: {req.petName}</p>
              <p>Usuario: {req.user}</p>
              <p>
                Estado:{' '}
                <span
                  className={`font-bold ${
                    req.status === 'Aprobada' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  {req.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
