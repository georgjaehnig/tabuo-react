import React from "react";
import { Card } from "rbx";

const cardStyles = {
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: 0,
  left: "5%",
  width: "90%",
  height: "65vh",
};

const TabuoCard = ({ zIndex = 0, title, content, footer }) => {
  return (
      <Card textSize={4} style={{ ...cardStyles, zIndex }} >
        <Card.Header>
          <Card.Header.Title
            align="centered"
            textColor="white"
            style={{ background: "#1a86ce" }}
          >
            {title}
          </Card.Header.Title>
        </Card.Header>
        <Card.Content textAlign="centered">{content}</Card.Content>
        {footer && (
          <Card.Footer>
            <Card.Footer.Item
              align="centered"
              textSize={6}
              style={{ fontStyle: "italic", background: "lightgrey" }}
            >
              {footer}
            </Card.Footer.Item>
          </Card.Footer>
        )}
      </Card>
  );
};

export default TabuoCard;
