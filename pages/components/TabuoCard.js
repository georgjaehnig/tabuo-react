import { Card, List } from 'rbx';

const TabuoCard = ({ zIndex = 0, card, children }) => (
  <div style={{ ...zIndex }}>
    <Card>
      <Card.Header>
        <Card.Header.Title align="centered">{card.target}</Card.Header.Title>
      </Card.Header>
      <Card.Content textAlign="centered">
        <List as="ul">
          {card.taboos.map((item, key) => <List.Item as="li" key={key}>{item}</List.Item> )}
        </List>
      </Card.Content>
    </Card>
  </div>
);

export default TabuoCard;
