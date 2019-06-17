import React, {Component} from "react";
import Swipeable from "react-swipy"

import Card from "./components/Card";
import Button from "./components/Button";

const wrapperStyles = {position: "relative", width: "250px", height: "250px"};
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class App extends Component {
  state = {
    cards: ["First", "Second", "Third"],
    stats: {
      accepted: 0,
      rejected: 0
    }
  };

  remove = () =>
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));

  count = (direction) => {
    switch (direction) {
      case 'left':
        this.setState(({stats}) => { 
          stats.rejected = stats.rejected + 1;
          return stats;
        });
        break;
      case 'right':
        this.setState(({stats}) => { 
          stats.accepted = stats.accepted + 1;
          return stats;
        });
        break;
    }
  };

  render() {
    const {cards, stats} = this.state;

    return (
      <div>
        <div>Accepted: {stats.accepted}</div>
        <div>Rejected: {stats.rejected}</div>
        <div style={wrapperStyles}>
          {cards.length > 0 ? (
            <div style={wrapperStyles}>
              <Swipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onAfterSwipe={this.remove}
                onSwipe={this.count}
              >
                <Card>{cards[0]}</Card>
              </Swipeable>
              {cards.length > 1 && <Card zIndex={-1}>{cards[1]}</Card>}
            </div>
          ) : (
            <Card zIndex={-2}>No more cards</Card>
          )}
        </div>
      </div>
    );
  }
}

export default App;
