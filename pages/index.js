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
import TabuoPlayCard from "./components/TabuoPlayCard";
import TabuoButton from "./components/TabuoButton";

import TimerMachine from 'react-timer-machine'

const wrapperStyles = {
  position: "relative", 
  height: "70vh", 
};

class App extends Component {
  state = {
    cards: arrayShuffle(Cards),  // All the cards, in an array of objects.
    index: 0,                    // Index of current card.
    trace: [],                   // The trace of decisions (accept, reject - as bool)
    decision: undefined,         // The current decision (accept, reject - as bool)
    stats: {                     // Collecting stats of current round
      accepted: 0,
      rejected: 0
    },
    timer: {
      started: false,
      paused: false,
    },
    mode: 'start',   // 'start', 'play' or 'wait'.
    team: 1,    // 1 or 2.
  };

  // Undo an Accept or Reject.
  // It will simply delete the trace from the end.
  undo = () => {
    this.setState((state) => {
      if (state.index == 0) {
        return state;
      }
      (state.trace.pop() 
        ? state.stats.accepted = state.stats.accepted - 1 
        : state.stats.rejected = state.stats.rejected - 1 )
      state.index--;
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
  afterSwipe = () => {
    switch (this.state.mode) {
      case 'start':
      case 'roundDone':
        this.setState((state) => { 
          state.mode = 'play';
          state.timer.started = true;
          state.stats.accepted = 0;
          state.stats.rejected = 0;
          return state;
        });
        break;
      case 'play':
        this.setState((state) => {
          state.trace.push(state.decision);
          state.index++;
          return state;
        });
        break;
    }
  };

  timerStartPause = () => {
    this.setState((state) => {
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
      state.mode = 'roundDone';
      return state;
    });
  };

  render() {

    const {cards, index, stats, trace, mode, team} = this.state;

    let firstCard, secondCard;
    let title, content;

    switch (mode) {
      case 'start':
        title = 'Kiel ludi';
        content = <div> 
          Klarigu la vorton al via(j) teamano(j) sen uzi la tabuojn sube.  
          <ul>
            <li>Je sukceso ŝovu dekstren; je malsukceso maldekstren.</li>
            <li>Je misŝovu alklaku la mezan butonon.</li>
          </ul>
        </div>
        firstCard = <TabuoCard title={title} content={content} />;
        secondCard = <TabuoPlayCard zIndex={-1} card={cards[0]} />;
      break;
      case 'play':
        firstCard = <TabuoPlayCard card={cards[index]}  />;
        {/* If there's at least one more card:
            stack it behind the visible card. */}
        secondCard = '';
        if (cards.length-index+1 > 1) {
          secondCard = <TabuoPlayCard zIndex={-1} card={cards[index]} />;
        }
        break;
      case 'roundDone':
        title = 'La rundo finiĝis';
        content = <div> 
          <ul>
            <li>Sukcesoj: {stats.accepted} </li>
            <li>Malsukcesoj: {stats.rejected} </li>
            <li>Ŝovu dekstren por rekomenci.</li>
          </ul>
        </div>
        firstCard = <TabuoCard title={title} content={content} />;
        secondCard = <TabuoPlayCard zIndex={-1} card={cards[0]} />;
      break;
    }

    return (
      <div>
        <Head>
          <title>Tabuo</title>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
        </Head>
        <Container>
          <Level breakpoint="mobile">
            <Level.Item textSize={3}> <img src="/static/images/icon.png" alt="Icon" /> </Level.Item>
            <Level.Item style={{visibility: this.state.mode == 'play' ? 'visible' : 'hidden' }}>
              <Button onClick={this.timerStartPause} style={{marginRight: '1em'}}>❚❚</Button>
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
          {cards.length > index ? (
            <div style={wrapperStyles}>
              <SwipySwipeable
                min={500}
                buttons={({left, right}) => (
                  <Level breakpoint="mobile" style={{ width:'100%' }}>
                    <Level.Item>
                      <TabuoButton textColor="danger" onClick={left} icon={faTimesCircle} counter={stats.rejected} />
                    </Level.Item>
                    <Level.Item>
                      <Button disabled={index==0} textColor="info" textSize={5} onClick={this.undo}> <FontAwesomeIcon icon={faUndo} /> </Button>
                    </Level.Item>
                    <Level.Item textColor="success">
                      <TabuoButton textColor="success" onClick={right} icon={faCheckCircle} counter={stats.accepted} />
                    </Level.Item>
                  </Level>
                )}
                onSwipe={this.count}
                onAfterSwipe={this.afterSwipe}
              >
                {firstCard}
              </SwipySwipeable>
            {secondCard}
            </div>
            ) : (
            <TabuoPlayCard zIndex={-2} />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
