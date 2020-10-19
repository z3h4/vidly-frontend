import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/navbar';
import NotFound from './components/common/notFound';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movies} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/not-found' component={NotFound} />
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
