import React from 'react';
import style from './ValidationMsgs.module.css';
import {connect} from 'react-redux';


const ValidationMsgs = (props) => {
    
    
        const valMessages = props.messages.map(message => {
         
            let btnType = '';
            if (message.type === 'danger') btnType = style.Danger; 
            if (message.type === 'success') btnType = style.Success;
         
            return (
                <div key={message.id} className={[style.ValidationMsgs, btnType].join(' ')} >
                    <p>{message.msg}</p>
                </div>
            )
        })

        if (props.messages.length > 0) {
            return valMessages;
        }

        return null;
    
    
}

const mapStateToProps = state => {
    return {
        messages: state.valAlert
    }
}


export default connect(mapStateToProps)(ValidationMsgs);