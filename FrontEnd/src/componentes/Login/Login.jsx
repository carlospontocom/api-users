import React from 'react'

const Login = () => {
    return (
        <div className="">
            <h2 className="text-6xl font-bold px-3 py-10 text-center">
                Área de login
            </h2>

            <form action="" className="flex flex-col gap-7 max-w-xl mx-auto">
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-400">Email/login</label>
                    <input type="text" className="py-3 px-2 border border-gray-300 rounded-md text-[18px]" placeholder="Login" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-400">Senha</label>
                    <input type="text" className="py-3 px-2 border border-gray-300 rounded-md text-[18px]" placeholder="Senha" />
                </div>
                <button className="bg-green-600 text-white font-semibold py-3 mt-3 rounded-md text-[18px] cursor-pointer">Acessar</button>
            </form>
        </div>
    )
}

export default Login
