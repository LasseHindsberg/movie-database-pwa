import { useState, useEffect } from 'react';
import './App.scss';
import SearchContext from './components/Searchcontext';
import { Router } from '@reach/router';
import Index from './views/Index';
import Movie from './views/Movie';
import PageNotFound from './views/404';

function App() {
  var searchState = useState([]);

  useEffect(function () {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
  });
  }, [])
  
  return (
    <SearchContext.Provider value={searchState}>
      <div className="app">
        <Router>
          <Index exact path="/" />
          <Movie exact path="/movie/:id" />
          <PageNotFound path="*" />
        </Router>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
