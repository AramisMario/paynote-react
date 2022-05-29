import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActiveLoansList} from './components/ActiveLoansList/ActiveLoanList';
import { HistoricalPaymentsList } from './components/HistoricalPaymentsList/HistoricalPaymentsList';
import {DebtorList} from "./components/DebtorsList/DebtorList";
import {TopMenu} from "./components/TopMenu/TopMenu";

function App() {

  const [navIndex, setNavIndex] = useState(0);

  return (
    <div className="App">
      <div className='MainContent'>
        <div className='TopMenu'>
          <TopMenu navIndex={navIndex} setNavIndex={setNavIndex}/>
        </div>
        <div className="MainList">
          {navIndex === 0 && <ActiveLoansList/>}
          {navIndex === 1 && <HistoricalPaymentsList/>}
          {navIndex === 2 && <DebtorList/>}
        </div>
      </div>
    </div>
  );
}

export default App;
