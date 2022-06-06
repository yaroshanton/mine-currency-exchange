import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem } from '@mui/material';
import './styles.scss';

function App() {
  const [course, setCourse] = useState(null);
  const [leftСurrency, setLeftСurrency] = useState('USD');
  const [rightСurrency, setRightСurrency] = useState('UAH');
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');

  const currencies = [
    {
      value: 'USD',
    },
    {
      value: 'EUR',
    },
    {
      value: 'UAH',
    },
  ];

  useEffect(() => {
    axios
      .get(
        `https://api.coingate.com/v2/rates/merchant/${leftСurrency}/${rightСurrency}`,
      )
      .then(res => {
        setCourse(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [leftСurrency, rightСurrency]);

  const handleChange = (name, e) => {
    console.log(e.target.value);
    switch (name) {
      case 'left':
        setLeftValue(Number(e.target.value));
        break;
      case 'rigth':
        setRightValue(Number(e.target.value));
        break;
      default:
        break;
    }
  };

  const showResult = () => {
    const result = leftValue * rightValue * course;
    return result.toFixed(2);
  };

  return (
    <div className="container">
      <div className="left_side">
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          onChange={e => handleChange('left', e)}
          type="number"
          placeholder="How much?"
          helperText="Please enter the quantity"
        />
        <TextField
          id="standard-select-currency"
          select
          variant="filled"
          defaultValue={leftСurrency}
          value={leftСurrency}
          onChange={e => setLeftСurrency(e.target.value)}
        >
          {currencies.map(({ value }, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="right_side">
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          onChange={e => handleChange('rigth', e)}
          type="number"
          placeholder="How much?"
          helperText="Please enter the quantity"
        />
        <TextField
          id="standard-select-currency"
          select
          variant="filled"
          defaultValue={rightСurrency}
          value={rightСurrency}
          onChange={e => setRightСurrency(e.target.value)}
        >
          {currencies.map(({ value }, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <p className="count_result">
        {showResult()} {rightСurrency}
      </p>
    </div>
  );
}

export default App;
