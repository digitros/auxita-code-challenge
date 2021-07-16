import React, { useEffect, useState } from 'react';
import Box from '../components/Box';

import CALCTYPES, {
  demoKidneyString,
  demoPressureString,
} from '../constants/CalculatorType';
import { BoxSizes } from '../interfaces/Props';

import '../styles/Calculator.styl';

interface IPressureDataObject {
  SysBP: number;
  DiaBP: number;
  atDate: string;
}

interface IKidneyDataObject {
  eGFR: number;
  atDate: string;
}

type IDataObject = IPressureDataObject | IKidneyDataObject;

interface ICalculatorProps {
  type: string;
}

const isPressure = (param: IDataObject): param is IPressureDataObject => {
  return (param as IPressureDataObject).DiaBP !== undefined;
};

const Calculator = ({ type }: ICalculatorProps) => {
  const [dataInput, setDataInput] = useState('');
  const [dataObject, setDataObject] = useState<IDataObject[]>([]);
  const [error, setError] = useState({});
  const [lastReading, setLastReading] = useState<IDataObject>();
  const [classification, setClassification] = useState('');

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
    const calculateHypertension = (reading: IDataObject) => {
      if (type === CALCTYPES.PRESSURE && isPressure(reading)) {
        if (reading.SysBP >= 180 && reading.DiaBP >= 120) {
          setClassification('Stage 3');
        } else if (
          reading.SysBP >= 160 &&
          reading.SysBP < 180 &&
          reading.DiaBP >= 100 &&
          reading.DiaBP < 110
        ) {
          setClassification('Stage 2');
        } else if (
          reading.SysBP >= 140 &&
          reading.SysBP < 160 &&
          reading.DiaBP >= 90 &&
          reading.DiaBP < 100
        ) {
          setClassification('Stage 1');
        } else {
          setClassification('No Hypertension');
        }
      } else if (type === CALCTYPES.KIDNEY && !isPressure(reading)) {
        if (reading.eGFR >= 90) {
          setClassification('Normal');
        } else if (reading.eGFR >= 60 && reading.eGFR <= 89) {
          setClassification('Mildy Decreased');
        } else if (reading.eGFR >= 45 && reading.eGFR <= 59) {
          setClassification('Mild to Moderate');
        } else if (reading.eGFR >= 30 && reading.eGFR <= 44) {
          setClassification('Moderate to Severe');
        } else if (reading.eGFR >= 15 && reading.eGFR <= 29) {
          setClassification('Deverely Decreased');
        } else {
          setClassification('Kidney Failure');
        }
      }
    };

    const isFormatCorrect = (data: IDataObject[]) => {
      if (type === CALCTYPES.PRESSURE) {
        return !data.some((item) => !isPressure(item));
      }
      return !data.some((item) => isPressure(item));
    };

    if (isFormatCorrect(data)) {
      const last = data.sort((a, b) => a.atDate.localeCompare(b.atDate)).pop();
      last && setLastReading(last);
      last && calculateHypertension(last);
    } else {
      setError({ message: 'Incorrect Format' });
    }
  };

  useEffect(() => {
    dataObject && type === CALCTYPES.PRESSURE
      ? calculateHealth(dataObject as IPressureDataObject[])
      : calculateHealth(dataObject as IKidneyDataObject[]);
  }, [dataObject]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="tools">
      <Box size={BoxSizes.large}>
        <div className="tools-title">
          <h2>{type}</h2>
        </div>
      </Box>
      <section className="tools-main">
        <Box size={BoxSizes.medium}>
          <div className="results">
            {lastReading ? (
              <>
                <span>
                  Last Reading:{' '}
                  {type === CALCTYPES.PRESSURE &&
                    isPressure(lastReading) &&
                    `SysBP: ${lastReading.SysBP} DisBP: ${lastReading.DiaBP}`}
                  {type === CALCTYPES.KIDNEY &&
                    !isPressure(lastReading) &&
                    `eGFR: ${lastReading.eGFR}`}
                </span>
                <span>Last Date: {lastReading.atDate}</span>
                <span>Classification: {classification}</span>
              </>
            ) : (
              <span>Here you will see your health calculation.</span>
            )}
          </div>
        </Box>
        <Box size={BoxSizes.medium}>
          <div className="calculator">
            <span>Please write/paste your data in following format: </span>
            <pre className="calculator-code">
              {type === CALCTYPES.PRESSURE
                ? demoPressureString
                : demoKidneyString}
            </pre>
            <textarea className="calculator-input" onChange={handleChange} />
            <button className="calculator-button" onClick={handleClick}>
              Send
            </button>
          </div>
        </Box>
      </section>
    </main>
  );
};

export default Calculator;
