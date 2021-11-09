import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivetRoute from './Pages/Login/PriverRoute/PrivetRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Switch>
          <PrivetRoute path="/appointment">
            <Appointment />
          </PrivetRoute>
          <PrivetRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivetRoute>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;