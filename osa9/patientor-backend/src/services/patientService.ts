import patients from '../../data/patients';
import {v4 as uuidv4} from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, Entry, NewHospitalEntry, HospitalEntry, HealthCheckEntry, NewHealthCheckEntry, OccupationalHealthcareEntry, NewOccupationalHealthcareEntry } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getPatientEntries = (id:string): Entry[] | undefined => {
  const patient:Patient|undefined = patients.find(patient => {return patient.id === id});
  return patient ? patient.entries : []; 
};

const getPatientData = (id:string): Patient | undefined => {
  return patients.find(patient => {return patient.id === id});
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addHospitalEntry = ( patient: Patient, entry: NewHospitalEntry ): HospitalEntry => {
  const newId:string = uuidv4();
  const newEntry:HospitalEntry = {
    id: newId,
    ...entry
  }
  patient.entries!.push(newEntry);
  return newEntry;
};

const addHealthCheckEntry = ( patient: Patient, entry: NewHealthCheckEntry ): HealthCheckEntry => {
  const newId:string = uuidv4();
  const newEntry:HealthCheckEntry = {
    id: newId,
    ...entry
  }
  patient.entries!.push(newEntry);
  return newEntry;
};

const addOccupationalHealthCareEntry = ( patient: Patient, entry: NewOccupationalHealthcareEntry ): OccupationalHealthcareEntry => {
  const newId:string = uuidv4();
  const newEntry:OccupationalHealthcareEntry = {
    id: newId,
    ...entry
  }
  patient.entries!.push(newEntry);
  return newEntry;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newId:string = uuidv4();
  const newPatient = {
      id: newId,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientData,
  getPatientEntries,
  addHealthCheckEntry,
  addHospitalEntry,
  addOccupationalHealthCareEntry
};