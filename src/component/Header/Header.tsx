import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-4 px-6 flex mb-4 bg-gradient-to-r from-gray-100 to-slate-400" >
            <h1 className="text-4xl font-bold tracking-tight text-dark flex-grow text-right" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Certificate Storage App</h1>
        </header>
    );
};

export default Header;

