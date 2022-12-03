import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Container,
  Autocomplete,
  Box
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookies from "js-cookie";
import {useSelector} from 'react-redux';

const initialForm = {
  amount: 0,
  description: "",
  category: "",
  date: new Date(),
};

const TransacyionForm = ({ fetchTransaction, editTransaction }) => {

  const {categories} = useSelector((state)=>state.auth.user);
  ////////////////////////////////////////////////////////setting initial value///////////////////////////////
  const [form, setForm] = useState(initialForm);
  const token = Cookies.get("token");

  //////////////////////////////////////categores///////////////////////////
  // const categories=[
  //   {label:"Travel", icon:"user"},
  //   {label:"Shopping", icon:"user"},
  //   {label:"Investment", icon:"user"},
  //   {label:"Bills", icon:"user"}
  // ]
  
  ///////////////////////////////////////////Transaction Data///////////////////////////////////////////

  ///////////////////////////////////////////Transaction update///////////////////////////////////////////

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }

    console.log(editTransaction);
  }, [editTransaction]);

  ////////////////////////////////////////////////handle input field///////////////////////////////////////////////////

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  ////////////////////////////////////////////////handle date///////////////////////////////////////////////////

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  /////////////////////////////////////////form submit send data to backend ////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);

    //condition for post n update

    const res = editTransaction.amount === undefined ? creates() : update();
  };

  //reload function

  const reload = (res) => {
    if (res.ok) {
      setForm(initialForm);
      fetchTransaction();
    }
  };

  //create n update function

  const creates = async () => {
    const res = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    reload(res);
  };

  const update = async () => {
    const res = await fetch(
      `http://localhost:5000/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    reload(res);
  };

  return (
    <>
      <Container>
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
          <CardContent>
          <Typography variant="h6">Add New Transaction</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{display:'flex'}}>
             
              <TextField
                sx={{ marginRight: 5 }}
                name="amount"
                value={form.amount}
                size="small"
                id="amount"
                label="Amount"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                sx={{ marginRight: 5 }}
                size="small"
                name="description"
                value={form.description}
                id="description"
                label="Description"
                variant="outlined"
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Transaction Date"
                  inputFormat="MM/DD/YYYY"
                  value={form.date}
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField
                      sx={{ marginRight: 5 }}
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>

              <Autocomplete
                value={form.category}
                onChange={(event, newValue) => {
                  setForm({ ...form, category: newValue.label });
                }}
                inputValue={form.category}
                id="combo-box-demo"
                options={categories}
                sx={{ width: 200 , marginRight: 5}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    size="small"
                  />
                )}
              />

              {editTransaction.amount !== undefined && (
                <Button type="submit" variant="contained" color="success">
                  Update
                </Button>
              )}
              {editTransaction.amount === undefined && (
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              )}
          
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default TransacyionForm;
