import React from 'react';
import { Button } from 'rbx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabuoButton = ({ textColor, onClick, icon, counter, disabled }) => {

  return <Button textColor={textColor} textSize={4} onClick={onClick} style={{ width:'70%' }} disabled={disabled} > 
			<FontAwesomeIcon icon={icon} /> 
			<span>&nbsp;</span>
			<div>{counter}</div>
		</Button>
};

export default TabuoButton;
