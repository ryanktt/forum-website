import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import style from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';
import {auth} from '../../redux/actions/auth';
import ValidationMsgs from '../../components/UI/Validation/ValidationMsgs';
import {validationAlert} from '../../redux/actions/validationAlert';

const Auth = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitAuth = async (e, type) => {
        e.preventDefault();

        const submitedData = {
            ...formData
        }
    
        try {

            if(type === 'signup') {
                console.log(type)
                if (submitedData.password !== submitedData.password2) {
                    console.log('aqui')
                    return props.valAlert('Senhas não coincidem.', 'danger', 3000);
                }  
            }
            const data = JSON.stringify(submitedData);
            const res =  await props.auth(data, type, props.history)
            
            if(res.type){
                type === 'login' ? props.history.push('/') : props.history.push('/auth/login');
            }

        } catch (err) {
            console.error(err) 
        }
       
        
    }


    let auth = (
        <div className={style.Auth}>
                <h2>Bem Vindo Ao <span>ForumPlayers</span></h2>
                <ValidationMsgs/>
            <Form submited={(e) => submitAuth(e, 'signup')}>
                
                    <h2>Registrar</h2>
                    <Link style={{textDecoration: 'none'}} to='/auth/login'><p className={style.Anchor}>Entrar</p></Link>
                    <div><Input change={onChange} type='text' name='name' label='Nome de Usuário'/></div>
                    <div><Input change={onChange} type='email' name='email' label='Email'/></div>
                    <div><Input change={onChange} type='password' name='password' label='Senha'/></div>
                    <div><Input change={onChange} type='password' name='password2' label='Corfirmar Senha'/></div>
                    <div className={style.Btn}><Button button >Registrar</Button></div>
            
            </Form>
        </div>
    )

    const path = props.location.pathname;
    if(path === '/auth/login') {
 
        auth = (
            <div className={style.Auth}>
                <h2>Bem Vindo Ao <span>ForumPlayers</span></h2>
                <ValidationMsgs/>
                <Form submited={(e) => submitAuth(e, 'login')}>
                        <h2>Entrar</h2>
                        <Link style={{textDecoration: 'none'}} to='/auth/signup'><p className={style.Anchor}>Registre-se</p></Link>
                        <div><Input change={onChange} type='email' name='email' label='Email'/></div>
                        <div><Input change={onChange} type='password' name='password' label='Senha'/></div>
                        <div className={style.Btn}><Button button>Entrar</Button></div>
                </Form>
            </div>
        )
    }

    return (
        <>
           {auth}
        </>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (formData, type) => dispatch(auth(formData, type)),
        valAlert: (msg, type, time) => dispatch(validationAlert(msg, type, time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
