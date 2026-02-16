import React from 'react';

const Campos = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="relative pb-4">
            <input type={type} placeholder={placeholder} className="py-5 text-[20px] px-3 px-1 outline-none bg-blue-100 w-full rounded-md" value={value} onChange={onChange} />
        </div>
    )
}

export default Campos;
