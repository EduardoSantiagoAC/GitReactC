import React, { useState } from 'react';

const Reviews = ({ reviews, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      setError('Por favor proporciona una calificación y un comentario.');
      return;
    }

    onAddReview({ rating, comment });
    setRating(0);
    setComment('');
    setError('');
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 'Sin calificaciones';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">Reseñas</h2>

      <div className="mb-6">
        <p className="text-lg text-gray-600">
          Calificación Promedio:{' '}
          <span className="font-bold text-primary-color">{averageRating}</span>
        </p>
      </div>

      {/* Lista de Reseñas */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow transition-transform duration-300 hover:scale-105"
            >
              <p className="text-yellow-500">⭐ {review.rating}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay reseñas aún.</p>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-gray-700">Calificación</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-3 border rounded"
          >
            <option value={0}>Selecciona una calificación</option>
            <option value={1}>1 - Muy mala</option>
            <option value={2}>2 - Mala</option>
            <option value={3}>3 - Regular</option>
            <option value={4}>4 - Buena</option>
            <option value={5}>5 - Excelente</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Comentario</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario aquí"
            className="w-full p-3 border rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-color text-white py-3 rounded hover:bg-purple-700 transition"
        >
          Enviar Reseña
        </button>
      </form>
    </div>
  );
};

export default Reviews;
