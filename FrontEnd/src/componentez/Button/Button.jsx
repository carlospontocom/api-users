import React from 'react'

const Button = ({ icon, labelButton, onClick, bgcolor }) => {
    return (
        <button className={`${bgcolor} text-white font-semibold py-3 px-4 cursor-pointer rounded-lg`} onClick={onClick}>
            <i className={icon}></i>
            {labelButton}
        </button>
    )
}

export default Button
