import React, { useState, useEffect } from "react";
import TransacyionForm from "../component/TransacyionForm";
import TransactionList from "../component/TransactionList";
import Cookies from 'js-cookie';

const Home = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  /////////////////////////////////////////fetching data from server //////////////////////////////////////////

  useEffect(() => {
    fetchTransaction();
  }, []);

  ///////////////////////////////////////////fetch transaction function/////////////////////////////

  const fetchTransaction = async () => {

    const token = Cookies.get('token')

    const res = await fetch("http://localhost:5000/transaction",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    const { data } = await res.json();
    setTransactionData(data);
    // console.log(data)
  };

  return (
    <>
      <TransacyionForm fetchTransaction={fetchTransaction} editTransaction={editTransaction} />
      <TransactionList
        transactionData={transactionData}
        fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
};

export default Home
