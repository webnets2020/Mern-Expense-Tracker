import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  IconButton,
} from "@mui/material";

import dayjs from "dayjs";
import Cookies from 'js-cookie';

const TransactionList = ({
  transactionData,
  fetchTransaction,
  setEditTransaction,
}) => {
  const remove = async (_id) => {

    const token = Cookies.get('token')

    if (!window.confirm("Are you sure !")) return;

    const res = await fetch(`http://localhost:5000/transaction/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization:`Bearer ${token}`,
      },
    });

    if (res.ok) {
      window.alert("Deleted Successfully...!");
      fetchTransaction();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MMM, YYYY");
  };

  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ marginTop: 10 }}>
          List of Transaction
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {data.amount}
                  </TableCell>
                  <TableCell align="right">{data.description}</TableCell>
                  <TableCell align="center">{formatDate(data.date)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      aria-label="update"
                      component="label"
                      onClick={() => setEditTransaction(data)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      aria-label="delete"
                      component="label"
                      onClick={() => remove(data._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TransactionList;
