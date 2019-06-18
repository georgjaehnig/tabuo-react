import React, {Component} from "react";
import Head from 'next/head';

import { Card, Container, Columns, Column, Level, LevelItem, List } from 'rbx';

import "rbx/index.sass";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import SwipySwipeable from "react-swipy"
import SwipyCard from "./components/Card";
import SwipyButton from "./components/Button";

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
        <Head>
          <title>Tabuo</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div>Accepted: {stats.accepted}</div>
        <div>Rejected: {stats.rejected}</div>
        <div style={wrapperStyles}>
          {cards.length > trace.length ? (
            <div style={wrapperStyles}>
              <SwipySwipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <SwipyButton onClick={left}>Reject</SwipyButton>
                    <SwipyButton onClick={this.undo}>Undo</SwipyButton>
                    <SwipyButton onClick={right}>Accept</SwipyButton>
                  </div>
                )}
                onSwipe={this.count}
                onAfterSwipe={this.next}
              >
                <SwipyCard>{cards[trace.length]}</SwipyCard>
              </SwipySwipeable>
              {cards.length-trace.length+1 > 1 && <SwipyCard zIndex={-1}>{cards[trace.length+1]}</SwipyCard>}
            </div>
          ) : (
            <SwipyCard zIndex={-2}>No more cards</SwipyCard>
          )}
        </div>
      </div>
    );
  }
}

export default App;
