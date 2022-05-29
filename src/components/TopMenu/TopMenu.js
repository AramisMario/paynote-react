import React from "react";
import "./TopMenu.css";
import { ButtonGroup, Button } from "react-bootstrap";
const TopMenu = (props) => {

    const {navIndex,setNavIndex} = props;
    return(
        <div className="menuList">
            <ButtonGroup aria-label="Basic example">
              <Button onClick={() => setNavIndex(0)}variant="primary">Deudas Activas</Button>
              <Button onClick={() => setNavIndex(1)}variant="primary">Historico</Button>
              <Button onClick={() => setNavIndex(2)}variant="primary">Deudores</Button>
            </ButtonGroup>
        </div>
    );

}

export {TopMenu};