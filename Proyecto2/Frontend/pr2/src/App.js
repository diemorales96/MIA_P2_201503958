//import logo from './logo.svg';
import { Navbar } from './components/navbar';
import { Administrador } from './components/administrador';
import { Guest } from './components/guest';
import { Login } from './components/login';
import { Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { createBrowserHistory } from 'history';

const hist = createBrowserHistory();


function App() {
  return (
    <html>
    <body>
    <div className="App"  >
      <Router history={hist}>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Guest} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/administrador" component={Administrador} />
        </Switch>
      </Router>
    </div>
    </body>
    </html>
  );
}

export default App;