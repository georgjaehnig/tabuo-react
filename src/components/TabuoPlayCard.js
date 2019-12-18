import React from 'react';
import { List } from 'rbx';
import TabuoCard from "./TabuoCard";

const TabuoPlayCard = ({ zIndex = 0, card }) => {

  let title = '';
  let content = '';
  let footer;

  if (card) {
    title = card.target;
    let contentItems =  card.taboos.map((item, key) => <List.Item as="li" key={key}>{item}</List.Item> );
    content = <div> <List as="ul" style={{lineHeight: '3.7vh'}}> {contentItems} </List> </div>;
		footer = card.author;
  }
  else {
    content = 'No more cards.'  
  }

  return <TabuoCard zIndex={zIndex} title={title} content={content} footer={footer} />

};

export default TabuoPlayCard;
