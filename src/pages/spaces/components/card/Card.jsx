import React from 'react';
import './style.css'
import { EditFilled, DeleteFilled } from '@ant-design/icons';


function Card({ name = "Nombre", crops = 0.0, onEdit, onDelete }) {
    return (
        <div className='card'>
            <div className='top'>
                <p className='name'>{name}</p>
                <div>
                    <button onClick={onEdit} className='button'><EditFilled style={{ color: "#048be9", fontSize: "25px" }} /></button>
                    <button onClick={onDelete} className='button'><DeleteFilled style={{ color: "#ec1515", fontSize: "25px" }} /></button>
                </div>
            </div>
            <p className='crops'>Cultivos en este espacio: {crops}</p>
        </div>
    );
}

export default Card;