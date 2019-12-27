import React from "react";
import { Card } from "rbx";

const TabuoCard = ({ zIndex = 0, title, content, footer }) => {
  return (
    <Card
      textSize={4}
      style={{
        cursor: "pointer",
        userSelect: "none",
        position: "absolute",
        top: 0,
        left: "5%",
        width: "90%",
        height: "65vh",
        zIndex: zIndex
      }}
    >
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
        <Card.Footer
          align="centered"
          textSize={6}
          style={{
            borderTop: 0,
            fontStyle: "italic",
            background: "lightgrey",
            position: "absolute",
            bottom: 0,
            width: "100%"
          }}
        >
          <Card.Footer.Item>{footer}</Card.Footer.Item>
        </Card.Footer>
      )}
    </Card>
  );
};

export default TabuoCard;
