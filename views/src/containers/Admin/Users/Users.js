import React, {useState } from 'react';
import style from './Users.module.css';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';


const Users = (props) => {
    const [banTime, setbanTime] = useState(7);
    const [IpBan, setIpBan] = useState(false);
    const [modalActive, setModalActive] = useState(false);


    let backdrop = null;

    modalActive ? backdrop = <Backdrop clicked={() => setModalActive(false)}/> :  backdrop = null
    console.log(modalActive)

    return (
        
        <div className={style.Users}> 
            {backdrop}
            <Modal 
            title='Ações de Administrador'
            close={() => setModalActive(false)}
            active={modalActive}>
                <div className={style.Ban}>
                    <Input type='text' change={(e) => setbanTime(e.target.value)} placeholder='Tempo (dias)' />
                    <div >
                        <button  className={style.Danger}>Banir</button>
                        <button  className={style.Danger}>Banir IP</button>
                    </div>
                    
                </div>
                <div className={style.Disban}><button  className={style.Success}>Remover Banimento</button></div>    
            </Modal>
            
            <table cellSpacing='3' cellPadding='2'>
                <thead>
                    <tr> 
                        <th>User Name</th>
                        <th>IP Address</th>
                        <th>Ações</th>
                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Loquiros</td>
                        <td>192.168.241.23</td>
                        <td onClick={()=> setModalActive(true)} className={style.Gear}><i class="fas fa-cog"></i></td>
                    </tr>
                    
                </tbody>
            </table>
       
        </div>
    )
}

export default Users;
