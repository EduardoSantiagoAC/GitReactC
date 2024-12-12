import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [ageGroup, setAgeGroup] = useState('Cachorros');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const handleSearch = () => {
    onSearch({ location, checkInDate, checkOutDate, ageGroup });
  };

  const mapRegions = ['América', 'Europa', 'Asia', 'África', 'Oceanía'];

  return (
    <div className="bg-[#E7D3BF] shadow-md rounded-full py-4 px-6 flex flex-col lg:flex-row items-center lg:justify-between max-w-5xl mx-auto relative z-10" style={{ marginTop: '-40px' }}>
 
      <div className="relative flex-1">
        <button
          onClick={() => setIsLocationDropdownOpen((prev) => !prev)}
          className="w-full bg-transparent outline-none px-4 py-2 text-[#B4789D] rounded-full border border-[#C6A89C] text-left transition-all hover:bg-[#D5ACC5]"
        >
          {location || '¿Dónde quieres buscar?'}
        </button>
        {isLocationDropdownOpen && (
          <motion.div
            className="absolute bg-white shadow-md rounded-lg p-4 top-12 left-0 w-full z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mapRegions.map((region, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setLocation(region);
                    setIsLocationDropdownOpen(false);
                  }}
                  className="flex items-center justify-center h-20 bg-[#F4E2D3] rounded-lg shadow hover:bg-[#E7D3BF] transition-all cursor-pointer"
                >
                  <span className="text-[#B4789D] font-semibold">{region}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

   
      <div className="flex flex-wrap lg:flex-nowrap items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
        <input
          type="date"
          placeholder="Check-in"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="bg-transparent outline-none px-4 py-2 text-[#B4789D] rounded-full border border-[#C6A89C] hover:bg-[#F4E2D3] transition-all"
        />
        <input
          type="date"
          placeholder="Check-out"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="bg-transparent outline-none px-4 py-2 text-[#B4789D] rounded-full border border-[#C6A89C] hover:bg-[#F4E2D3] transition-all"
        />
      </div>

      
      <div className="relative mt-4 lg:mt-0">
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="w-full bg-transparent outline-none px-4 py-2 text-[#B4789D] rounded-full border border-[#C6A89C] hover:bg-[#F4E2D3] transition-all"
        >
          <option value="Cachorros">Cachorros (0-1 años)</option>
          <option value="Jóvenes">Jóvenes (1-3 años)</option>
          <option value="Adultos">Adultos (3-7 años)</option>
          <option value="Mayores">Mayores (7+ años)</option>
        </select>
      </div>

      
      <button
        onClick={handleSearch}
        className="mt-4 lg:mt-0 bg-gradient-to-r from-[#C6A89C] to-[#B4789D] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
