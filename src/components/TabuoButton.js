import React from 'react';
import { Button } from 'rbx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabuoButton = ({ textColor, onClick, icon, counter, disabled }) => {

  return <Button textColor={textColor} onClick={onClick} style={{ width:'70%', fontSize: '4vh'}} disabled={disabled} > 
			<FontAwesomeIcon icon={icon} /> 
			<span>&nbsp;</span>
			<div>{counter}</div>
		</Button>
};

export default TabuoButton;
