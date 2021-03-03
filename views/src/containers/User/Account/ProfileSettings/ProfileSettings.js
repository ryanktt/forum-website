import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './ProfileSettings.module.css';
import Form from '../../../../components/UI/Form/Form';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import {editUserProfile} from '../../../../redux/actions/admin';
import {updateProfile, fetchUser} from '../../../../redux/actions/user';
import {validationAlert} from '../../../../redux/actions/validationAlert';
import Alert from '../../../../components/UI/Validation/ValidationMsgs';

const ProfileSettings = (props) => {
    const {clientUser, setAlert, updateProfile, loadedUser, fetchUser, location, match, adminEditProfile} = props;
    const isAdmin = location.pathname === `/admin/edit-account/${match.params.id}`;

    let user = clientUser;
    if(isAdmin) user = loadedUser;

    let title = 'Perfil';

    const [settings, setSettings] = useState({
        userImg: '',
        description: ''
    })


    useEffect(() => {
        if(user) setSettings({userImg: user.profile.userImg, description: user.profile.description})
    }, [user])

    const onChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
        
    }


    let onSubmit = async (e) => {
        e.preventDefault();
        const res = await  updateProfile(settings);
        if(res === 'err') return setAlert('Ocorreu um Erro', 'danger');
        return setAlert('Atualizado com Sucesso', 'success');
    }

    //admin
    useEffect(() => {
        if(isAdmin) {
            fetchUser(match.params.id)
        }
    }, [isAdmin])

    if(isAdmin) {
        title = 'Editar Perfil'

    onSubmit = async (e) => {
        e.preventDefault();
        const res = await  adminEditProfile(match.params.id, settings);
        if(res === 'err') return setAlert('Ocorreu um Erro', 'danger');
        return setAlert('Atualizado com Sucesso', 'success');
    }
    }

    return (
        user ? <div className={style.ProfileSettings}>
            <h2>{title}</h2>
            <Alert/>
            <Form submited={(e) => onSubmit(e)}>
                <div className={style.UserImg}><img src={user.profile.userImg} alt='user-img'/></div>
                <div><Input label='Avatar' value={settings.userImg}  change={onChange} name='userImg' placeholder='Digite a URL do seu avatar'/></div>
                <div><Input textarea label='Assinatura' value={settings.description} change={onChange} name='description'/></div>
                <div className={style.Btn} ><Button type='submit' button>Atualizar</Button></div>
            </Form>
        </div> : null
    )


}

const mapStateToProps = state => {
    return {
        clientUser: state.auth.user,
        loadedUser: state.user.data

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        updateProfile: (data) => dispatch(updateProfile(data)),
        setAlert: (msg, type) => dispatch(validationAlert(msg, type)),
        adminEditProfile: (userId, data) => dispatch(editUserProfile(userId, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
