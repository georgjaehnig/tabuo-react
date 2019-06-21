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
import TabuoCard from "./components/TabuoCard";

const wrapperStyles = {
  position: "relative", 
  width: "250px", 
  height: "400px",
};

class App extends Component {
  state = {
    cards: arrayShuffle(Cards),
    trace: [],
    decision: undefined,
    stats: {
      accepted: 0,
      rejected: 0
    },
    windowWidth: undefined,
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

 componentDidMount() {
   this.setState((state) => {
     state.windowWidth = window.innerWidth;
     return state;
   });
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
                min={500}
                buttons={({left, right}) => (
                  <Level breakpoint="mobile" style={{position: 'absolute', left: 50, width: this.state.windowWidth-100 }}>
                    <Level.Item>
                      <Button textColor="danger" textSize={3} onClick={left}> <FontAwesomeIcon icon={faTimesCircle} /> </Button>
                    </Level.Item>
                    <Level.Item>
                      <Button disabled={trace.length==0} textColor="info" textSize={5} onClick={this.undo}> <FontAwesomeIcon icon={faUndo} /> </Button>
                    </Level.Item>
                    <Level.Item textColor="success">
                      <Button textColor="success" textSize={3} onClick={right}> <FontAwesomeIcon icon={faCheckCircle} /> </Button>
                    </Level.Item>
                  </Level>
                )}
                onSwipe={this.count}
                onAfterSwipe={this.next}
              >
                <TabuoCard card={cards[trace.length]} windowWidth={this.state.windowWidth} />
              </SwipySwipeable>
              {cards.length-trace.length+1 > 1 && <TabuoCard zIndex={-1} card={cards[trace.length+1]} windowWidth={this.state.windowWidth} /> }
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
