import React from 'react';
import './style.css'
import { CloseOutlined } from '@ant-design/icons';
import { format } from 'date-fns';


function NotificationCard({ name,date,description,onDelete }) {
    const formattedDate = new Date(date._seconds * 1000 + date._nanoseconds / 1000000).toLocaleString();
    return (
        <div className='card'>
            <div className='top'>
                <h2 className='name'>{name}</h2>
                <div>
                    <button onClick={onDelete} className='button'><CloseOutlined style={{ color: "#ec1515", fontSize: "25px" }} /></button>
                </div>
            </div>
            <p>Fecha: {formattedDate}</p>
            <p>Descripción: {description}</p>
        </div>
    );
}

export default NotificationCard;