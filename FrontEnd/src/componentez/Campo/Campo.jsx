import React from 'react'

const Campo = ({ type, onChange, name, placeholder }) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                value={name}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-400 rounded-lg py-4 px-2 w-full"
            />
        </div>
    )
}

export default Campo;