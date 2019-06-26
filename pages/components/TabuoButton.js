import { Button } from 'rbx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabuoButton = ({ textColor, onClick, icon, counter }) => {

  return <Button textColor={textColor} textSize={4} onClick={onClick}> 
			<FontAwesomeIcon icon={icon} /> 
			<span>&nbsp;</span>
			<div>{counter}</div>
		</Button>
};

export default TabuoButton;
