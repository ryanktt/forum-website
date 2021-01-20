import React from 'react';
import style from './NewThread.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Form from '../../components/UI/Form/Form';

const NewThread = () => {
    return (
        <div className={style.NewThread}>
            <h2>Novo Tópico</h2>
            <Form method='Post' path='/user/new-thread'>
                <Input label='Título' name='title'/>
                <textarea  />
                <div className={style.Button}>
                    <Button button>Postar Tópico</Button>
                </div>
            </Form>
                
        </div>
    )
}

export default NewThread;
