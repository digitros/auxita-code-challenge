import React, { useEffect, useState } from 'react';

/* Components */
import Box from '../components/Box';

/* Constants */
import CALCTYPES, {
  demoKidneyString,
  demoPressureString,
} from '../constants/CalculatorType';

/* Styles */
import '../styles/Calculator.styl';

/* Interfaces */
import { BoxSizes } from '../interfaces/Props';

/* i18n */
import { useTranslation } from 'react-i18next';

interface IPressureDataObject {
  SysBP: number;
  DiaBP: number;
  atDate: string;
}

interface IKidneyDataObject {
  eGFR: number;
  atDate: string;
}

interface IDrops {
  drop: number;
  readings: IKidneyDataObject[];
}

type IDataObject = IPressureDataObject | IKidneyDataObject;

interface ICalculatorProps {
  type: string;
}

interface IError {
  message: string;
}

const isPressure = (param: IDataObject): param is IPressureDataObject => {
  return (param as IPressureDataObject).DiaBP !== undefined;
};

const Calculator = ({ type }: ICalculatorProps) => {
  const { i18n, t } = useTranslation(['Calculator']);
  const [dataInput, setDataInput] = useState('');
  const [dataObject, setDataObject] = useState<IDataObject[]>([]);
  const [error, setError] = useState<IError>({} as IError);
  const [lastReading, setLastReading] = useState<IDataObject>();
  const [classification, setClassification] = useState('');
  const [drops, setDrops] = useState<IDrops[]>([]);

  const parseStringToJSON = (stringToParse: string) => {
    try {
      setDataObject(JSON.parse(stringToParse));
    } catch (error) {
      setError({
        message: t('Calculator:IncorrectFormat', 'Incorrect Format'),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataInput(e.target.value);
  };

  const handleClick = () => {
    parseStringToJSON(dataInput);
  };

  const calculateHealth = (data: IDataObject[]) => {
    const calculateDisease = (reading: IDataObject) => {
      if (type === CALCTYPES.PRESSURE && isPressure(reading)) {
        if (reading.SysBP >= 180 && reading.DiaBP >= 120) {
          setClassification(t('Calculator:Stage3', 'Stage 3'));
        } else if (
          reading.SysBP >= 160 &&
          reading.SysBP < 180 &&
          reading.DiaBP >= 100 &&
          reading.DiaBP < 110
        ) {
          setClassification(t('Calculator:Stage2', 'Stage 2'));
        } else if (
          reading.SysBP >= 140 &&
          reading.SysBP < 160 &&
          reading.DiaBP >= 90 &&
          reading.DiaBP < 100
        ) {
          setClassification(t('Calculator:Stage1', 'Stage 1'));
        } else {
          setClassification(t('Calculator:NoStage', 'No Hypertension'));
        }
      } else if (type === CALCTYPES.KIDNEY && !isPressure(reading)) {
        if (reading.eGFR >= 90) {
          setClassification(t('Calculator:Normal', 'Normal'));
        } else if (reading.eGFR >= 60 && reading.eGFR <= 89) {
          setClassification(t('Calculator:MildyDecreased', 'Mildy Decreased'));
        } else if (reading.eGFR >= 45 && reading.eGFR <= 59) {
          setClassification(t('Calculator:MildModerate', 'Mild to Moderate'));
        } else if (reading.eGFR >= 30 && reading.eGFR <= 44) {
          setClassification(t('Calculator:ModSevere', 'Moderate to Severe'));
        } else if (reading.eGFR >= 15 && reading.eGFR <= 29) {
          setClassification(
            t('Calculator:SeveDecreased', 'Severely Decreased')
          );
        } else {
          setClassification(t('Calculator:Failure', 'Kidney Failure'));
        }
      }
    };

    const calculateDrops = (data: IKidneyDataObject[]) => {
      const orderedData = data.sort((a, b) => a.atDate.localeCompare(b.atDate));
      const dropReadings = orderedData
        .map((item, index, arr) => {
          if (index !== arr.length - 1) {
            const dropPercentage = Math.floor(
              100 - (arr[index + 1].eGFR * 100) / item.eGFR
            );
            if (dropPercentage >= 20) {
              return { drop: dropPercentage, readings: [item, arr[index + 1]] };
            }
          }
        })
        .filter((item) => item);
      setDrops(dropReadings as IDrops[]);
    };

    const isFormatCorrect = (dataFormat: IDataObject[]) => {
      try {
        if (type === CALCTYPES.PRESSURE) {
          return !dataFormat.some((item) => !isPressure(item));
        }
        return !dataFormat.some((item) => isPressure(item));
      } catch (error) {
        setError({
          message: t('Calculator:IncorrectFormat', 'Incorrect Format'),
        });
      }
    };

    if (isFormatCorrect(data)) {
      const last = data.sort((a, b) => a.atDate.localeCompare(b.atDate))[
        data.length - 1
      ];
      type === CALCTYPES.KIDNEY && calculateDrops(data as IKidneyDataObject[]);
      last && setLastReading(last);
      last && calculateDisease(last);
    } else {
      setError({
        message: t('Calculator:IncorrectFormat', 'Incorrect Format'),
      });
    }
  };

  useEffect(() => {
    const re = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    if (!dataObject.every((item) => (item.atDate.match(re) ? true : false))) {
      console.log('hola');
      setError({
        message: t('Calculator:IncorrectFormat', 'Incorrect Format'),
      });
    } else {
      dataObject && type === CALCTYPES.PRESSURE
        ? calculateHealth(dataObject as IPressureDataObject[])
        : calculateHealth(dataObject as IKidneyDataObject[]);
    }
  }, [dataObject]);

  useEffect(() => {
    error.message && setTimeout(() => setError({} as IError), 5000);
  }, [error]);

  return (
    <main className="tools">
      {error.message && <div className="error">{error.message}</div>}
      <Box size={BoxSizes.large}>
        <div className="tools-title">
          <h2>{t(`Nav:${type.split(' ')[0]}`, type)}</h2>
        </div>
      </Box>
      <section className="tools-main">
        <Box size={BoxSizes.medium}>
          <div className="results">
            {lastReading ? (
              <>
                <div className="results-topic">
                  <h2>{t('Calculator:LastReading', 'Last Reading')}:</h2>
                  {type === CALCTYPES.PRESSURE && isPressure(lastReading) && (
                    <span>
                      SysBP: <strong>{lastReading.SysBP}</strong> DisBP:{' '}
                      <strong>{lastReading.DiaBP}</strong>
                    </span>
                  )}
                  {type === CALCTYPES.KIDNEY && !isPressure(lastReading) && (
                    <span className="results-topic-important">
                      eGFR: <strong>{lastReading.eGFR}</strong>
                    </span>
                  )}
                </div>
                <span className="results-topic">
                  {t('Calculator:LastDate', 'Last Date')}:{' '}
                  <strong>{lastReading.atDate}</strong>
                </span>
                <span className="results-topic">
                  {t('Calculator:Class', 'Classification')}:{' '}
                  <strong>{classification}</strong>
                </span>
              </>
            ) : (
              <span className="results-topic">
                {t(
                  'Calculator:BeforeCalc',
                  'Here you will see your health calculation.'
                )}
              </span>
            )}
            {drops.length > 0 && (
              <div className="drops-container">
                <h2>{t('Calculator:ImportantDrops', 'Important Drops')}</h2>
                {drops.map((drop, index) => {
                  return (
                    <div className="drops-section" key={`drop${index}`}>
                      <span>
                        {t('Calculator:DropPercentage', 'Drop Percentage')}:{' '}
                        {drop.drop}%
                      </span>
                      {drop.readings.map((read, readIndex) => {
                        return (
                          <div
                            key={`dropStat${readIndex}`}
                            className="drops-section-item"
                          >
                            <span>
                              eGFR: <strong>{read.eGFR}</strong>
                            </span>
                            <span>
                              {t('Calculator:Date', 'Date')}:{' '}
                              <strong>{read.atDate}</strong>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Box>
        <Box size={BoxSizes.medium}>
          <div className="calculator">
            <span>
              {t(
                'Calculator:Input',
                'Please write/paste your data in following format'
              )}
              :{' '}
            </span>
            <pre className="calculator-code">
              {type === CALCTYPES.PRESSURE
                ? demoPressureString
                : demoKidneyString}
            </pre>
            <textarea className="calculator-input" onChange={handleChange} />
            <button className="calculator-button" onClick={handleClick}>
              {t('Calculator:Send', 'Send')}
            </button>
          </div>
        </Box>
      </section>
    </main>
  );
};

export default Calculator;
