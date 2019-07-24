import { List } from 'rbx';
import TabuoCard from "./TabuoCard";

const TabuoPlayCard = ({ zIndex = 0, card }) => {

  let title = '';
  let content = '';

  if (card) {
    title = card.target;
    let contentItems =  card.taboos.map((item, key) => <List.Item as="li" key={key}>{item}</List.Item> );
    content = <List as="ul"> {contentItems} </List>;
  }
  else {
    content = 'No more cards.'  
  }

  return <TabuoCard zIndex={zIndex} title={title} content={content} />

};

export default TabuoPlayCard;
