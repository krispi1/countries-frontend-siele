import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import Countries from './components/Countries';
import Country from './components/Country';
import ButtonLinks from './utilities/ButtonLinks';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
});

// Trial data fetch
/* client
  .query({
    query: gql`
      query {
        countries {
          name,
          code,
          native,
          phone,
          currency,
          languages {
            name,
            native
          },
          continent {
            name
          }
        }
      }
    `
  })
  .then(result => {
    console.log(`result: ${result}`);
    let countries = result.data.countries;
    console.log(countries);
  }) */

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/countries" component={Countries} />
            <Route exact path="/countries/:code" component={Country} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
    
  ); // end return

} // end App()

function Page404({ location }) {
  const style404 = {
    marginTop: '30px',
    fontSize: '2.9em'
  }
  return <div className="content-area">
    <h2 style={style404}>Sorry, we couldn't find the page you requested:<br /> 
    <code>{location.pathname}</code></h2><br/>
    <ButtonLinks />
  </div>
}

export default App;
