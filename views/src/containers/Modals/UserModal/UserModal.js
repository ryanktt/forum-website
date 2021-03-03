import React, {useState} from 'react';
import {connect} from 'react-redux';
import Dropdown from '../../../components/Dropdown/Dropdown';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import {banUser, unbanUser} from '../../../redux/actions/admin';

const UserModal = (props) => {
    const {active, close, ban, unban, userId} = props;
    const [banTime, setBanTime] = useState(null);

    const onBan = async() => {
        await ban(userId, banTime)
    }

    const onUnban = async() => {
        await unban(userId);
    }

    const onChangeBanTime = (e) => {
        let time = e.target.value
        if(time !== 'permanent') time = Number(time)
        setBanTime(time)
    }

    const banOptions = [
        {value: 1, name: '1 Dia'},
        {value: 3, name: '3 Dias'},
        {value: 7, name: '7 Dias'},
        {value: 14, name: '14 Dias'},
        {value: 30, name: '30 Dias'},
        {value: 'permanent', name: 'Permanente'},
    ]

    return (
        <Modal active={active} close={close} title='Ações de Administrador'>
                <div style={{marginBottom: '15px'}}>
                    <Dropdown change={onChangeBanTime} options={banOptions} placeholder='Tempo de Ban'/>
                    <div><Button button danger clicked={onBan}>Banir</Button></div>
                </div>
                <div>
                <div><Button clicked={onUnban} button success>Remover Banimento</Button></div>
                <div><Button link={`/admin/edit-account/${userId}`} success>Editar Usuário</Button></div>
                </div>

            </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        ban: (userId, time) => dispatch(banUser(userId, time)),
        unban: (userId) => dispatch(unbanUser(userId))
    }
}

export default connect(null, mapDispatchToProps)(UserModal);
