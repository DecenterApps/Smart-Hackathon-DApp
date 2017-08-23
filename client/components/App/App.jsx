import React from 'react';
import * as eth from '../../modules/ethereumService';
import Footer from '../Footer/Footer';
import AdminHeader from '../Header/AdminHeader';
import AdminSponsorsForm from '../Admin/AdminSponsors/AdminSponsorsForm';

const styles = require('./app.scss');

const App = () => (
  <div className={styles.app}>
    <AdminHeader />

    <div className="form-name">Doprinesi nagradnom fondu</div>

    <div className="form-wrapper">
      <AdminSponsorsForm submitText="Doprinesi" submitTextSubmitting="Šalje se" />
    </div>

    <Footer />
  </div>
);

export default App;
