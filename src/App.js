import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActiveLoansList} from './components/ActiveLoansList/ActiveLoanList';
import { HistoricalPaymentsList } from './components/HistoricalPaymentsList/HistoricalPaymentsList';
import {DebtorList} from "./components/DebtorsList/DebtorList";
import {TopMenu} from "./components/TopMenu/TopMenu";
import {AddLoanModal} from "./components/AddLoanModal/AddLoanModal";
import {ChartModal} from "./components/ChartModal/ChartModal";
import Axios from "axios";
import { useLoanList } from './customHooks/useLoanList';
import activeLoanListContext from './context/ActiveLoanListContext';
import {useChart} from "./customHooks/useChart";
import {AddIcon} from "./components/AddIcon/AddIcon";

function App() {

  const [navIndex, setNavIndex] = useState(0);
  const [loanModalShow,setLoanModalShow] = useState(false);
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

const {
  // chartSeries, 
  // setSeries,
  // categories,
  // setCategories,
  options,
  setOptions,
  viewChart,
  setViewChart,
  setSeriesAndCategories} = useChart();


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
      setLoanModalShow(false);
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
              setLoanList,
              setViewChart,
              setSeriesAndCategories
            }}>
                <ActiveLoansList/>
            </activeLoanListContext.Provider>
          }
          {navIndex === 1 && <HistoricalPaymentsList/>}
          {navIndex === 2 && <DebtorList/>}
          {viewChart && <ChartModal options={options} show={viewChart} onHide={() => setViewChart(false)}/>}
        </div>
      </div>
      <AddIcon setLoanModalShow={setLoanModalShow}/>
      <AddLoanModal
        types={types}
        debtors={debtors}
        show={loanModalShow}
        createLoan={createLoan}
        onHide={() => setLoanModalShow(false)}
      />

    </div>
  );
}

export default App;
