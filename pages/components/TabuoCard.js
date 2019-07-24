import { Card } from 'rbx';

const cardStyles = {
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: 0,
  left: '5%',
  width: "90%", 
};

const TabuoCard = ({ zIndex = 0, title, content }) => {

  return <div style={{ ...cardStyles, zIndex }} >
    <Card textSize={4} style={{height: '65vh'}}>
      <Card.Header>
        <Card.Header.Title align="centered">{title}</Card.Header.Title>
      </Card.Header>
      <Card.Content textAlign="centered">{content}</Card.Content>
    </Card>
  </div>
};

export default TabuoCard;
