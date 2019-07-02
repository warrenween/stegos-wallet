import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import PortfolioPage from './containers/PortfolioPage';
import AccountsPage from './containers/AccountsPage';
import SendPage from './containers/SendPage';
import ReceivePage from './containers/ReceivePage';
import NodePage from './containers/NodePage';
import Menu from './components/Menu';
import StatusBar from './components/StatusBar';
import styles from './Routes.css';

export default () => (
  <App>
    <div className={styles.Container}>
      <StatusBar containerClassName={styles.StatusBar} />
      <Menu className={styles.Menu} />
      <div className={`${styles.PageScrollWrapper} ScrollBar`}>
        <div className={styles.Page}>
          <Switch>
            <Route exact path={routes.PORTFOLIO} component={PortfolioPage} />
            <Route path={routes.ACCOUNTS} component={AccountsPage} />
            <Route path={routes.SEND} component={SendPage} />
            <Route path={routes.RECEIVE} component={ReceivePage} />
            <Route path={routes.NODE} component={NodePage} />
          </Switch>
        </div>
      </div>
    </div>
  </App>
);
