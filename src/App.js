import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActiveLoansList} from './components/ActiveLoansList/ActiveLoanList';
function App() {
  return (
    <div className="App">
      <ActiveLoansList/>
    </div>
  );
}

export default App;
