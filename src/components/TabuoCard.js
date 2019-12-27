import React from "react";
import { Card } from "rbx";

const cardStyles = {
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  top: 0,
  left: "5%",
  width: "90%"
};

const TabuoCard = ({ zIndex = 0, title, content, footer }) => {
  return (
    <div style={{ ...cardStyles, zIndex }}>
      <Card textSize={4} style={{ height: "65vh" }}>
        <Card.Header>
          <Card.Header.Title
            align="centered"
            style={{ background: "#1a86ce" }}
            textColor="white"
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
    </div>
  );
};

export default TabuoCard;
