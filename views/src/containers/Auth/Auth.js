import React from 'react';
import style from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';

const Auth = (props) => {

    console.log(props.location.pathname);

    return (
        <div className={style.Auth}>
                <h2>Bem Vindo ao <span>ForumPlayers</span></h2>
            <Form action='/' method='Post'>
                
                    <h2>Registrar</h2>
                    <div><Input type='text' name='username' label='Nome de Usuário'/></div>
                    <div><Input type='email' name='email' label='Email'/></div>
                    <div><Input type='password' name='email' label='Senha'/></div>
                    <div><Input type='password' name='password2' label='Corfirmar Senha'/></div>
                    <div className={style.Btn}><Button  >Registrar </Button></div>
            
            </Form>
        </div>
    )
}

export default Auth;
