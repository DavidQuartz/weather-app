import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SuspenseLoader from './components/SuspenseLoader';
import AppContextProvider from './context/AppContext';
import WeatherContextProvider from './context/WeatherContext';

const Home = lazy(() => import('./Pages/Home'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <AppContextProvider>
          <WeatherContextProvider>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </WeatherContextProvider>
        </AppContextProvider>
      </Suspense>
    </Router>
  );
};

export default App;
