import React from 'react';
import * as eth from '../../modules/ethereumService';

console.log(eth);

const styles = require('./app.scss');

const App = () => (
  <div className={styles.app}>
    <div>Commpetition has not yet started</div>
  </div>
);

export default App;
