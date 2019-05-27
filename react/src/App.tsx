import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { IAppView, AppPresenter, Injector } from './core';
import Header from './components/Header';
import Todos from './components/Todos';
import CompleteAll from './components/CompleteAll';
import Footer from './components/Footer';

interface IAppState {
  isListVisible: boolean;
};

function Home() {
  return <Todos key="none" filter="none" />;
}

function ActiveTodos() {
  return <Todos key="active" filter="active" />;
}

function CompletedTodos() {
  return <Todos key="completed" filter="completed" />;
}


export default class App extends Component<{}, IAppState> implements IAppView {
  protected readonly presenter: AppPresenter = Injector.resolve(AppPresenter);

  public get isListVisible(): boolean {
    return this.state ? this.state.isListVisible : false;
  }

  public showList(): void {
    this.setState({
      isListVisible: true
    });
  }

  public hideList(): void {
    this.setState({
      isListVisible: false
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
  }

  render() {
    return (
      <Router>
        <section className="todoapp">
          <Header />
          { (this.isListVisible) ? (
            <section className="main">
              <CompleteAll />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <Route path="/" exact component={Home} />
              <Route path="/active/" component={ActiveTodos} />
              <Route path="/completed/" component={CompletedTodos} />
            </section>
          ) : '' }
          { (this.isListVisible) ? (
            <Footer />
          ) : '' }
        </section>
      </Router>
    )
  }
}
