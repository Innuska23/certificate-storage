import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-4 px-6 flex justify-center items-center mb-4 bg-gradient-to-r from-gray-100 to-slate-400" >
            <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-6xl text-center">Certificate Storage App</h1>
        </header>
    );
};

export default Header;
