import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom' // Importer pour la navigation
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

// La page APP sert de navigation 

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} /> {/* Nous dirige vers la page Accueil */}
          <Route path="/a-propos" exact component={About} /> {/* Nous dirige vers la page About */}
          <Route component={NotFound} /> {/* Nous dirige vers la page Not found, si aucune page trouver */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;