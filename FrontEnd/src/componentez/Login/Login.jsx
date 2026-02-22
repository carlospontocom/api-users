import React from 'react'
import Campo from '../Campo/Campo'
import Button from '../Button/Button'

const Login = () => {
    return (
        <div>
            <Campo placeholder="E-mail cadastrado" type="email"
                name="email" />

            <Campo placeholder="Senha de acesso" type="password"
                name="senha" />

            <Button labelButton="Acessar" bgcolor="bg-green-600" />
        </div>
    )
}

export default Login
