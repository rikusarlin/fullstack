import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientData = (id:string): Patient | undefined => {
  return patients.find(patient => {return patient.id === id});
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newId:string = uuidv4();
  const newPatient = {
      id: newId,
    ...entry
  };

  patients?.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientData
};