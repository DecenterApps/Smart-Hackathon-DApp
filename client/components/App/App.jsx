import React from 'react';
import * as eth from '../../modules/ethereumService';
import Footer from '../Footer/Footer';

import Header from '../Header/index.jsx';

const styles = require('./app.scss');

const App = () => (
  <div className={styles.app}>
    <Header />
    <div className="container white hero">
      <h1 className="hero">Takmičenje još nije počelo</h1>
    </div>

    <Footer />
  </div>
);

export default App;
