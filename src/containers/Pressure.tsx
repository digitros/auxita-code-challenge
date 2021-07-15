import React, { useEffect, useState } from 'react';
import Box from '../components/Box';

import { BoxSizes } from '../interfaces/Props';

import '../styles/Pressure.styl';

interface IDataObject {
  eGFR: number;
  atDate: string;
}

const Pressure = () => {
  const [dataInput, setDataInput] = useState('');
  const [dataObject, setDataObject] = useState([] as IDataObject[]);
  const [error, setError] = useState({});
  const [lastReading, setLastReading] = useState({} as IDataObject);
  const demoString = `
[
  {"eGFR": 65, "atDate": "2018/10/31"},
  {"eGFR": 70, "atDate": "2018/10/20"},
  {"eGFR": 70, "atDate": "2017/10/20"}
]
    `;

  const parseStringToJSON = async (stringToParse: string) => {
    try {
      await setDataObject(JSON.parse(stringToParse));
    } catch (error) {
      if (error && typeof error === 'object') {
        setError(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataInput(e.target.value);
  };

  const handleClick = () => {
    parseStringToJSON(dataInput);
  };

  const calculateHealth = (data: IDataObject[]) => {
    const last = data.sort((a, b) => a.atDate.localeCompare(b.atDate)).pop();
    last && setLastReading(last);
  };

  useEffect(() => {
    calculateHealth(dataObject);
  }, [dataObject]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main>
      <Box size={BoxSizes.medium}>
        <div className="results">
          <span>Last Reading: {lastReading.eGFR}</span>
          <span>Last Date: {lastReading.atDate}</span>
        </div>
      </Box>
      <Box size={BoxSizes.medium}>
        <div className="calculator">
          <span>Please paste your data in following format: </span>
          <pre className="calculator-code">{demoString}</pre>
          <textarea className="calculator-input" onChange={handleChange} />
          <button className="calculator-button" onClick={handleClick}>
            Send
          </button>
        </div>
      </Box>
    </main>
  );
};

export default Pressure;
