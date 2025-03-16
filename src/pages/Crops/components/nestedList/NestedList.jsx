import React, { useState } from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import './style.css'
import { Col, Row } from 'antd';


function NestedList({ crop, tempMin, tempMax,humMin, humMax, humFmin, humFmax, type, space, onEdit, onDelete }) {
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
          <h2>{crop}</h2>
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
            <p>Espacio: {space} </p>
            <p>Humedad ambiente mínima: {humMin} % </p>
            <p>Humedad ambiente máxima: {humMax} %</p>
            <p>Humedad suelo mínima: {humFmin} %</p>
            <p>Humedad suelo máxima: {humFmax} %</p>
            <p>Temperatura ambiente mínima: {tempMin} °C</p>
            <p>Temperatura ambiente máxima: {tempMax} °C</p>
            <p>Tipo de planta: {type} </p>
          </Col>
        </Row>
      </Collapse>
    </List>
  );
}

export default NestedList;