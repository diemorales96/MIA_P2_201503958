import logo from './logo.svg';
import { Navbar } from './components/navbar';
import { Administrador } from './components/administrador';
//import { Aplicante } from './components/aplicante';
//import { Coordinador } from './components/coordinador';
import { Guest } from './components/guest';
//import { Revisor } from './components/revisor';
import { Login } from './components/login';
//import { Usuarios } from './components/usuarios';
import { Router, Switch, Route } from 'react-router-dom';
//import { coordinator } from './components/views/addCoordinador';
//import { reviewerX } from './components/views/addRevisor';
//import { editAplicante } from './components/views/editarAplicante';
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