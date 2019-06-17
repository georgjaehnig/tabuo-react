import React, {Component} from "react";
import Swipeable from "react-swipy"

import Card from "./components/Card";
import Button from "./components/Button";

const wrapperStyles = {
  position: "relative", 
  width: "250px", 
  height: "250px"
};

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class App extends Component {
  state = {
    cards: ["First", "Second", "Third", "Fourth", "Fifth"],
    trace: [],
    decision: undefined,
    stats: {
      accepted: 0,
      rejected: 0
    }
  };

  undo = () => {
    this.setState((state) => {
      if (state.trace.length == 0) {
        return state;
      }
      (state.trace.pop() 
        ? state.stats.accepted = state.stats.accepted - 1 
        : state.stats.rejected = state.stats.rejected - 1 )
      return state;
    });
  };

  next = () =>
    this.setState((state) => {
      state.trace.push(state.decision);
      return state;
    });

  count = (direction) => {
    switch (direction) {
      case 'left':
        this.setState((state) => { 
          state.decision = false;
          state.stats.rejected = state.stats.rejected + 1;
          return state;
        });
        break;
      case 'right':
        this.setState((state) => { 
          state.decision = true;
          state.stats.accepted = state.stats.accepted + 1;
          return state;
        });
        break;
    }
  };

  render() {
    const {cards, stats, trace} = this.state;

    return (
      <div>
        <div>Accepted: {stats.accepted}</div>
        <div>Rejected: {stats.rejected}</div>
        <div style={wrapperStyles}>
          {cards.length > trace.length ? (
            <div style={wrapperStyles}>
              <Swipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={this.undo}>Undo</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onSwipe={this.count}
                onAfterSwipe={this.next}
              >
                <Card>{cards[trace.length]}</Card>
              </Swipeable>
              {cards.length-trace.length+1 > 1 && <Card zIndex={-1}>{cards[trace.length+1]}</Card>}
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
