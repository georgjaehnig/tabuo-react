import { Card, List } from 'rbx';

const cardStyles = {
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: 0,
  left: '5%',
  width: "90%", 
};

const TabuoCard = ({ zIndex = 0, card }) => {

  return <div style={{ ...cardStyles, zIndex }} >
    { card ? (
      <Card textSize={4}>
        <Card.Header>
          <Card.Header.Title align="centered">{card.target}</Card.Header.Title>
        </Card.Header>
        <Card.Content textAlign="centered" >
          <List as="ul">
            {card.taboos.map((item, key) => <List.Item as="li" key={key}>{item}</List.Item> )}
          </List>
        </Card.Content>
      </Card>
    ) : (
      <Card>
        <Card.Content textAlign="centered">
          No more cards.
        </Card.Content>
      </Card>
    )}
  </div>
};

export default TabuoCard;
