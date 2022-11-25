import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

////////////////////////////////////////////////handle input field///////////////////////////////////////////////////

  const inputHandle = (e) => {
    setForm({ ...form,[e.target.name]: e.target.value});
    console.log(e.target.value);
  };

/////////////////////////////////////////form submit send data to backend ////////////////////////////////////////

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(form);

    const res = await fetch("http://localhost:5000/transaction",{
      method:"POST",
      body:form
    });

    console.log(res)



  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          placeholder="Enter Transaction Amlount"
          onChange={inputHandle}
        />
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Enter Transaction Description"
          onChange={inputHandle}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={inputHandle}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
