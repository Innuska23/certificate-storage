import React from 'react';

import { NavLink } from 'react-router-dom';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4 w-24 text-center"
    >
      {children}
    </NavLink>
  );
};

export default Button;

