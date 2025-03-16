import React from 'react';
import './style.css'
import { CloseOutlined } from '@ant-design/icons';


function NotificationCard({ name,date,description,onDelete }) {
    return (
        <div className='card'>
            <div className='top'>
                <h2 className='name'>{name}</h2>
                <div>
                    <button onClick={onDelete} className='button'><CloseOutlined style={{ color: "#ec1515", fontSize: "25px" }} /></button>
                </div>
            </div>
            <p>Fecha: {date}</p>
            <p>Descripción: {description}</p>
        </div>
    );
}

export default NotificationCard;