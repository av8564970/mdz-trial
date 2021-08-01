import React, { FC, useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import ServerSidePropsContext, { ServerSideProps } from '../contexts/server-side-props';
import PostListPage from './PostListPage/PostListPage';
import PostEditPage from './PostEditPage/PostEditPage';

import 'antd/dist/antd.css';
import './App.scss';


const browserHistory = createBrowserHistory();


const App: FC<ServerSideProps> = (props) => {
  const [ useServerSideProps, setUseServerSideProps ] = useState(true);

  useEffect(() => {
    return browserHistory.listen(() => {
      setUseServerSideProps(false);
    });
  }, []);


  return (
    <ServerSidePropsContext.Provider value={useServerSideProps ? props : {}}>
      <Router history={browserHistory}>
        <Switch>
          <Route path="/posts" exact component={PostListPage} />
          <Route path="/posts/:id" component={PostEditPage} />
        </Switch>
      </Router>
    </ServerSidePropsContext.Provider>
  );
};

export default App;
