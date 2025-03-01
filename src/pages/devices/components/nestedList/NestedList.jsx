import React, { useState } from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import './style.css'
import { Col, Row } from 'antd';


function NestedList({ name = "Dispositivo X", crop = "Cultivo X", min = 0.0, max = 0.0, type, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
    >
      <Row>
        <Col span={20} className='left'>
          <h2>{name}</h2>
          <button onClick={onEdit} style={{ backgroundColor: "#fff" }} ><EditFilled style={{ color: "#048be9", fontSize: "25px" }} /></button>
          <button onClick={onDelete} style={{ backgroundColor: "#fff" }}><DeleteFilled style={{ color: "#ec1515", fontSize: "25px" }} /></button>
        </Col>
        <Col span={1} className='right'>
          <ListItemButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Col>
      </Row>



      <Collapse in={open} timeout="auto" unmountOnExit>
        <Row className='row'>
          <Col span={24}>
            <p>Cultivo: {crop}</p>
            <p>Rango mínimo: {min} {type == "Temperatura" ? '°C':'%'}</p>
            <p>Rango máximo: {max} {type == "Temperatura" ? '°C':'%'}</p>
            <p>Tipo de sensor: {type}</p>
          </Col>
        </Row>
      </Collapse>
    </List>
  );
}

export default NestedList;