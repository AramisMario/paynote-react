import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActiveLoansList} from './components/ActiveLoansList/ActiveLoanList';
import { HistoricalPaymentsList } from './components/HistoricalPaymentsList/HistoricalPaymentsList';
import {DebtorList} from "./components/DebtorsList/DebtorList";
import {TopMenu} from "./components/TopMenu/TopMenu";
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MyModal} from "./components/Modal/Modal";
import Axios from "axios";
import { useLoanList } from './customHooks/useLoanList';
import activeLoanListContext from './context/ActiveLoanListContext';
library.add(faPlusCircle);

function App() {

  const [navIndex, setNavIndex] = useState(0);
  const [modalShow,setModalShow] = useState(false);
  const [debtors, setDebtors] = useState([]);
  const [types, setTypes] = useState([]);

  const {
    loanList,
    setLoanList,
    addPayment,
    cancelPayment,
    createPayment,
    openManagerDispatcher,
    openManager
  } = useLoanList([]);

  useEffect(()=>{
    Axios.get('http://127.0.0.1:4000/debtors/alldebtors')
    .then((response) => {
        setDebtors(response.data);
    })
    .catch((error) => {
        console.log(error);
    });

    Axios.get('http://127.0.0.1:4000/types/all')
    .then((response) => {
      setTypes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  },[]);

  const createLoan = ({amount,debtorId,typeId,description,percent},setForm) =>{
    let data = {
      amount,
      debtorId,
      description,
      percent,
      typeId
    };
    Axios.post('http://127.0.0.1:4000/loans/createloan',data)
    .then((response) =>{
      setForm({debtorId:null,description:'',amount:0,typeId:null,percent:''});
      setLoanList(response.data);
      setModalShow(false);
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <div className='MainContent'>
        <div className='TopMenu'>
          <TopMenu navIndex={navIndex} setNavIndex={setNavIndex}/>
        </div>
        <div className="MainList">

          {navIndex === 0 &&
            <activeLoanListContext.Provider value={{
              createPayment,
              cancelPayment,
              openManagerDispatcher,
              addPayment,
              openManager,
              loanList,
              setLoanList
            }}>
                <ActiveLoansList/>
            </activeLoanListContext.Provider>
          }
          {navIndex === 1 && <HistoricalPaymentsList/>}
          {navIndex === 2 && <DebtorList/>}
        </div>
      </div>

      <div className="AddLoanIcon">
        <FontAwesomeIcon icon={faPlusCircle} onClick={() => setModalShow(true)} color="red" size="4x"/>
      </div>

      <MyModal
        types={types}
        debtors={debtors}
        show={modalShow}
        createLoan={createLoan}
        onHide={() => setModalShow(false)}
      />

    </div>
  );
}

export default App;
