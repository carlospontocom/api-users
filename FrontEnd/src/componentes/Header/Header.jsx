import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="bg-green-900 text-white shadown-lg">
            <nav className="flex justify-between px-3 max-w-5xl mx-auto py-5">
                <h2 className="text-3xl font-bold">Front<span>API</span></h2>
                <ul className="flex gap-8 text-[20px]">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
