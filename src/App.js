import React, {Component} from 'react';
import icon from './images/icon.png';

import arrayShuffle from 'array-shuffle';
import Cards from './cards.js';

import 'rbx/index.sass';
import '../src/App.sass';

import {
  Button,
  Container,
  Columns,
  Column,
  Level,
  LevelItem,
  List,
  Select,
} from 'rbx';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle,
  faUndo,
  faSmileWink,
} from '@fortawesome/free-solid-svg-icons';

import SwipySwipeable from 'react-swipy';
import TabuoCard from './components/TabuoCard';
import TabuoPlayCard from './components/TabuoPlayCard';
import TabuoButton from './components/TabuoButton';

import TimerMachine from 'react-timer-machine';

const wrapperStyles = {
  position: 'relative',
  height: '70vh',
};

class App extends Component {
  state = {
    cards: arrayShuffle(Cards), // All the cards, in an array of objects.
    index: 0, // Index of current card.
    trace: [], // The trace of decisions (accept, reject - as bool)
    decision: undefined, // The current decision (accept, reject - as bool)
    language: 'en',
    stats: {
      // Collecting stats of current round
      accepted: 0,
      rejected: 0,
    },
    timer: {
      started: false,
      paused: false,
    },
    mode: 'start', // 'start', 'play' or 'wait'.
  };

  // Undo an Accept or Reject.
  // It will simply delete the trace from the end.
  undo = () => {
    this.setState(state => {
      if (state.trace.length == 0) {
        return state;
      }
      state.trace.pop()
        ? (state.stats.accepted = state.stats.accepted - 1)
        : (state.stats.rejected = state.stats.rejected - 1);
      state.index--;
      return state;
    });
  };

  // Count the current decision,
  //   remember it in state.decision.
  swipe = direction => {
    if (this.state.mode != 'play') {
      return;
    }
    switch (direction) {
      case 'left':
        this.setState(state => {
          state.decision = false;
          state.stats.rejected = state.stats.rejected + 1;
          return state;
        });
        break;
      case 'right':
        this.setState(state => {
          state.decision = true;
          state.stats.accepted = state.stats.accepted + 1;
          return state;
        });
        break;
    }
  };

  afterSwipe = () => {
    switch (this.state.mode) {
      case 'start':
      case 'roundDone':
        this.setState(state => {
          state.mode = 'play';
          state.timer.started = true;
          state.stats.accepted = 0;
          state.stats.rejected = 0;
          state.trace = [];
          return state;
        });
        break;
      case 'play':
        this.setState(state => {
          state.trace.push(state.decision);
          state.index++;
          return state;
        });
        break;
    }
  };

  timerStartPause = () => {
    this.setState(state => {
      // Pause
      if (state.timer.started && !state.timer.paused) {
        state.timer.paused = true;
        return state;
      }
      // Unpause
      if (state.timer.started && state.timer.paused) {
        state.timer.paused = false;
        return state;
      }
    });
  };

  timerResume = () => {
    this.setState(state => {
      state.timer.started = false;
      state.timer.paused = false;
      state.mode = 'roundDone';
      // Increase index
      // so that next round starts with new card.
      state.index++;
      return state;
    });
  };

  changeLanguage = event => {
    this.setState({language: event.target.value});
  };

  render() {
    const {cards, index, stats, trace, mode} = this.state;

    let firstCard, secondCard;
    let title, content;

    let texts = {
      en: {
        start: {
          title: 'How to play',
          content: (
            <div>
              Explain the word to your team without using the taboos below.
              <ul>
                <li>If suceeded, swipe →, if failed, swipe ←</li>
                <li>If swiped wrongly, tap the middle undo button.</li>
                <li>Swipe → to start.</li>
              </ul>
            </div>
          ),
        },
        roundDone: {
          title: 'Round ended',
          content: (
            <div>
              <ul>
                <li>Successes: {stats.accepted} </li>
                <li>Fails: {stats.rejected} </li>
                <li>Swipe → to restart.</li>
              </ul>
            </div>
          ),
        },
      },
      eo: {
        start: {
          title: 'Kiel ludi',
          content: (
            <div>
              Klarigu la vorton al via(j) teamano(j) sen uzi la tabuojn sube.
              <ul>
                <li>Je sukceso ŝovu →, je malsukceso ←</li>
                <li>Je misŝovu alklaku la mezan butonon.</li>
              </ul>
            </div>
          ),
        },
        roundDone: {
          title: 'La rundo finiĝis',
          content: (
            <div>
              <ul>
                <li>Sukcesoj: {stats.accepted} </li>
                <li>Malsukcesoj: {stats.rejected} </li>
                <li>Ŝovu → por rekomenci.</li>
              </ul>
            </div>
          ),
        },
      },
    };

    switch (mode) {
      case 'start':
        title = texts[this.state.language].start.title;
        content = texts[this.state.language].start.content;
        firstCard = <TabuoCard title={title} content={content} />;
        secondCard = <TabuoPlayCard zIndex={-1} card={cards[index]} />;
        break;
      case 'play':
        firstCard = <TabuoPlayCard card={cards[index]} />;
        {
          /* If there's at least one more card:
            stack it behind the visible card. */
        }
        secondCard = '';
        if (cards.length - index + 1 > 1) {
          secondCard = <TabuoPlayCard zIndex={-1} card={cards[index + 1]} />;
        }
        break;
      case 'roundDone':
        title = texts[this.state.language].roundDone.title;
        content = texts[this.state.language].roundDone.content;
        firstCard = <TabuoCard title={title} content={content} />;
        secondCard = <TabuoPlayCard zIndex={-1} card={cards[index]} />;
        break;
    }

    return (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -55%)',
          fontSize: "3.5vh",
        }}>
        <Container>
          <Level
            breakpoint="mobile"
            style={{
              fontSize: "3vh"
            }}
          >
            <Level.Item>
              <img src={icon} alt="Icon" />
            </Level.Item>
            <Level.Item>
              <Select.Container>
                <Select
                  value={this.state.language}
                  onChange={this.changeLanguage}>
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="eo">Esperanto</Select.Option>
                </Select>
              </Select.Container>
            </Level.Item>
            <Level.Item
              style={{
                visibility: this.state.mode == 'play' ? 'visible' : 'hidden',
              }}>
              <Button
                onClick={this.timerStartPause}
                style={{marginRight: '1em'}}>
                {this.state.timer.paused ? '▶' : '❚❚'}
              </Button>
              <TimerMachine
                timeStart={60 * 1000} // Start at 60 seconds.
                timeEnd={0 * 1000}
                started={this.state.timer.started}
                paused={this.state.timer.paused}
                countdown={true}
                interval={1000} // Tick every 1 second.
                formatTimer={(time, ms) => {
                  return ms / 1000;
                }}
                onComplete={this.timerResume}
              />
            </Level.Item>
          </Level>
          {cards.length > index ? (
            <div style={wrapperStyles}>
              <SwipySwipeable
                min={500}
                buttons={({left, right}) => (
                  <Level breakpoint="mobile" style={{width: '100%'}}>
                    <Level.Item>
                      <TabuoButton
                        disabled={this.state.timer.paused}
                        textColor="danger"
                        onClick={left}
                        icon={faTimesCircle}
                        counter={stats.rejected}
                      />
                    </Level.Item>
                    <Level.Item>
                      <Button
                        disabled={index == 0}
                        textColor="info"
                        onClick={this.undo}>
                        <FontAwesomeIcon icon={faUndo} />
                      </Button>
                    </Level.Item>
                    <Level.Item textColor="success">
                      <TabuoButton
                        disabled={this.state.timer.paused}
                        textColor="success"
                        onClick={right}
                        icon={faCheckCircle}
                        counter={stats.accepted}
                      />
                    </Level.Item>
                  </Level>
                )}
                onSwipe={this.swipe}
                onAfterSwipe={this.afterSwipe}>
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
