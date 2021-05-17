import { NewPatient, Gender } from './types';

type Fields = { name : unknown, ssn: unknown, occupation: unknown, gender: unknown, dateOfBirth: unknown };

const toNewPatient = ({ name, ssn, occupation, gender, dateOfBirth } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, "name"),
    ssn: parseString(ssn, "ssn"),
    occupation: parseString(occupation, "occupation"),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth, "date of birth")
  };

  return newPatient;
};

const parseString = (stringValue: unknown, stringName: string): string => {
    if (!stringValue || !isString(stringValue)) {
      throw new Error(`Incorrect or missing ${stringName}`);
    }
    return stringValue;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown, dateName:string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${dateName}: ${date}`);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export default toNewPatient;