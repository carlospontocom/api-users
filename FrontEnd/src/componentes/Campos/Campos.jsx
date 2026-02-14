import React from 'react';

const Campos = ({ type, placeholder, value, msgErro, onChange }) => {
    return (
        <div className="relative pb-4">
            <input type={type} placeholder={placeholder} className="py-2 px-1 outline-none bg-blue-100 w-full rounded-md" value={value} onChange={onChange} />
            <span className="text-sm text-red-400 absolute hidden">{msgErro}</span>
        </div>
    )
}

export default Campos;
