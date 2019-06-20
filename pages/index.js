import React, {Component} from "react";
import Head from 'next/head';

import arrayShuffle from 'array-shuffle';

import { Button, Card, Container, Columns, Column, Level, LevelItem, List } from 'rbx';

import "rbx/index.sass";

import "../src/App.sass";
import Cards from "../src/cards.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle, faUndo, faSmileWink } from '@fortawesome/free-solid-svg-icons'

import SwipySwipeable from "react-swipy"
import SwipyCard from "./components/Card";
import SwipyButton from "./components/Button";
import TabuoCard from "./components/TabuoCard";

const wrapperStyles = {
  position: "relative", 
  width: "250px", 
  height: "400px",
};

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class App extends Component {
  state = {
    cards: arrayShuffle(Cards),
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
        <Head>
          <title>Tabuo</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <Container>

          <Level breakpoint="mobile">
            <Level.Item textColor="danger">
             <FontAwesomeIcon icon={faTimesCircle} />
             <span>&nbsp;</span>
             <div>{stats.rejected}</div>
            </Level.Item>
            <Level.Item textSize={3}><FontAwesomeIcon icon={faSmileWink} /> </Level.Item>
            <Level.Item textColor="success">
             <FontAwesomeIcon icon={faCheckCircle} />
             <span>&nbsp;</span>
             <div>{stats.accepted}</div>
            </Level.Item>
          </Level>

          <div style={wrapperStyles}>
          {cards.length > trace.length ? (
            <div style={wrapperStyles}>
              <SwipySwipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button textColor="danger" textSize="3" onClick={left}> <FontAwesomeIcon icon={faTimesCircle} /> </Button>
                    <Button textColor="info" textSize="3" onClick={this.undo}> <FontAwesomeIcon icon={faUndo} /> </Button>
                    <Button textColor="success" textSize="3" onClick={right}> <FontAwesomeIcon icon={faCheckCircle} /> </Button>
                  </div>
                )}
                onSwipe={this.count}
                onAfterSwipe={this.next}
              >
                <TabuoCard card={cards[trace.length]} />
              </SwipySwipeable>
              {cards.length-trace.length+1 > 1 && <TabuoCard zIndex={-1} card={cards[trace.length+1]} /> }
            </div>
            ) : (
            <TabuoCard zIndex={-2} />
          )}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
