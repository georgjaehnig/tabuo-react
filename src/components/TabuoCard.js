import React from "react";
import { Card } from "rbx";

const TabuoCard = ({ zIndex = 0, title, content, footer }) => {
  return (
    <Card
      style={{
        cursor: "pointer",
        userSelect: "none",
        position: "absolute",
        top: 0,
        left: "5%",
        width: "90%",
        fontSize: "3.5vh",
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
      <Card.Content textAlign="centered" style={{ padding: "3vh" }}>
        {content}
      </Card.Content>
      {footer && (
        <Card.Footer
          align="centered"
          style={{
            borderTop: 0,
            fontStyle: "italic",
            background: "lightgrey",
            position: "absolute",
            bottom: 0,
            width: "100%",
            fontSize: "0.8em"
          }}
        >
          <Card.Footer.Item>{footer}</Card.Footer.Item>
        </Card.Footer>
      )}
    </Card>
  );
};

export default TabuoCard;
