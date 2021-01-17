import React from 'react';
import style from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const Auth = (props) => {

    console.log(props.location.pathname);

    return (
        <div className={style.Auth}>
            <div className={style.Form}>
                <h2>Bem Vindo ao <span>ForumPlayers</span></h2>
                <form action='/' method='Post'>
                    <h2>Registrar</h2> 
                    <Input type='text' name='username' label='Nome de Usuário'/>
                    <Input type='email' name='email' label='Email'/>
                    <Input type='password' name='email' label='Senha'/>
                    <Input type='password' name='password2' label='Corfirmar Senha'/>
                    <Button button >Registrar </Button>
                </form>   
            </div>

        </div>
    )
}

export default Auth;
