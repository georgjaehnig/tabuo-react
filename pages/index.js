import React, {Component} from "react";
import Head from 'next/head';

import arrayShuffle from 'array-shuffle';
import Cards from "../src/cards.js";

import { Button, Container, Columns, Column, Level, LevelItem, List } from 'rbx';

import "rbx/index.sass";
import "../src/App.sass";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle, faUndo, faSmileWink } from '@fortawesome/free-solid-svg-icons'

import SwipySwipeable from "react-swipy"
import TabuoCard from "./components/TabuoCard";
import TabuoButton from "./components/TabuoButton";

import TimerMachine from 'react-timer-machine'

const wrapperStyles = {
  position: "relative", 
  width: "250px", 
  height: "400px",
};

class App extends Component {
  state = {
    cards: arrayShuffle(Cards),  // All the cards, in an array of objects.
    trace: [],                   // The trace of decisions (accept, reject - as bool)
    decision: undefined,         // The current decision (accept, reject - as bool)
    stats: {                     // Collecting stats of current round
      accepted: 0,
      rejected: 0
    },
    windowWidth: undefined,      // Width of window, to calculate card width
    timer: {
      started: false,
      paused: false,
    }
  };

  // Undo an Accept or Reject.
  // It will simply delete the trace from the end.
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

  // Count the current decision,
  //   remember it in state.decision.
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

  // Push decision into trace.
  //   This is an extra function, 
  //   triggered not onSwipe but onAfterSwipe
  //   to avoid rendering issues.
  next = () =>
    this.setState((state) => {
      state.trace.push(state.decision);
      return state;
    });

  timerStartPause = () => {
    this.setState((state) => {
      // Start.
      if ((!state.timer.started) && (!state.timer.paused)) {
        // Reset stats.
        state.stats.accepted = 0;
        state.stats.rejected = 0;
        state.timer.started = true;
        return state;
      }
      // Pause
      if ((state.timer.started) && (!state.timer.paused)) {
        state.timer.paused = true;
        return state;
      }
      // Unpause
      if ((state.timer.started) && (state.timer.paused)) {
        state.timer.paused = false;
        return state;
      }
    });
  };

  timerResume = () => {
    this.setState((state) => {
      state.timer.started = false;
      state.timer.paused = false;
      return state;
    });
  };

  // Set card size after window width is known.
  componentDidMount() {
    this.setState((state) => {
      state.windowWidth = window.outerWidth;
      return state;
    });
  };

  render() {

    const {cards, stats, trace} = this.state;

    return (
      <div>
        <Head>
          <title>Tabuo</title>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
        </Head>
        <Container>
          <Level breakpoint="mobile">
            <Level.Item textSize={3}><FontAwesomeIcon icon={faSmileWink} /> </Level.Item>
            <Level.Item> <Button onClick={this.timerStartPause}>startPause</Button> </Level.Item>
            <Level.Item> <Button onClick={this.timerResume}>stop</Button> </Level.Item>
            <Level.Item>
              <TimerMachine
                timeStart={60 * 1000}               // Start at 60 seconds.
                timeEnd={0 * 1000} 
                started={this.state.timer.started}
                paused={this.state.timer.paused}
                countdown={true} 
                interval={1000}                     // Tick every 1 second.
                formatTimer={(time, ms) => {
                    return ms/1000;
                  }
                }
                onComplete={this.timerResume}
              />
            </Level.Item>
          </Level>
          <div style={wrapperStyles}>
          {cards.length > trace.length ? (
            <div style={wrapperStyles}>
              <SwipySwipeable
                min={50}
                buttons={({left, right}) => (
                  <Level breakpoint="mobile" style={{position: 'absolute', left: 50, width: this.state.windowWidth-100 }}>
                    <Level.Item>
                      <TabuoButton textColor="danger" onClick={left} icon={faTimesCircle} counter={stats.rejected} />
                    </Level.Item>
                    <Level.Item>
                      <Button disabled={trace.length==0} textColor="info" textSize={5} onClick={this.undo}> <FontAwesomeIcon icon={faUndo} /> </Button>
                    </Level.Item>
                    <Level.Item textColor="success">
                      <TabuoButton textColor="success" onClick={right} icon={faCheckCircle} counter={stats.accepted} />
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
