import { NewPatient, Gender, Discharge, SickLeave, Entry, EntryType, HealthCheckRating, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from './types';

type Fields = { name : unknown, ssn: unknown, occupation: unknown, gender: unknown, dateOfBirth: unknown, entries: Entry[] };
type NewHospitalEntryFields = { description: unknown, specialist: unknown, date: unknown, diagnosisCodes: unknown[], discharge: unknown};
type NewOccupationalHealthCareEntryFields = { description: unknown, specialist: unknown, date: unknown, diagnosisCodes: unknown[], sickLeave: unknown, employerName: unknown};
type NewHealthCheckEntryFields = { description: unknown, specialist: unknown, date: unknown, diagnosisCodes: unknown[], healthCheckRating: unknown};
type DischargeFields = { date: unknown, criteria: unknown};
type SickLeaveFields = { startDate: unknown, endDate: unknown};

const toDischarge = ({ date, criteria } : DischargeFields): Discharge => {
  const newDischarge: Discharge = {
    date: parseDate(date, "discharge date"),
    criteria: parseString(criteria, "discharge criteria")
  };
  return newDischarge;
};

const toSickLeave = ({ startDate, endDate } : SickLeaveFields): SickLeave => {
  const newSickLeave: SickLeave = {
    startDate: parseDate(startDate, "sick leave start date"),
    endDate: parseDate(endDate, "sick leave end date")
  };
  return newSickLeave;
};

const toNewPatient = ({ name, ssn, occupation, gender, dateOfBirth, entries } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, "name"),
    ssn: parseString(ssn, "ssn"),
    occupation: parseString(occupation, "occupation"),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth, "date of birth"),
    entries: parseEntryArray(entries, "entries")
  };
  return newPatient;
};

const toNewHospitalEntry = ({ description, specialist, date, diagnosisCodes, discharge}:NewHospitalEntryFields): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    type: "Hospital",
    description: parseString(description, "entry description"),
    specialist: parseString(specialist, "entry specialist"),
    date: parseDate(date, "entry date"),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes, "diagnosis codes", false) : [],
    discharge: parseDischarge(discharge, "discharge")
  }
  return newEntry;
}; 

const toNewOccupationalHealthCareEntry = ({ description, specialist, date, diagnosisCodes, sickLeave, employerName}:NewOccupationalHealthCareEntryFields): NewOccupationalHealthcareEntry => {
  const newEntry: NewOccupationalHealthcareEntry = {
    type: "OccupationalHealthcare",
    description: parseString(description, "entry description"),
    specialist: parseString(specialist, "entry specialist"),
    date: parseDate(date, "entry date"),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes, "diagnosis codes", false) : [],
    sickLeave: parseSickLeave(sickLeave, "sick leave", false) ,
    employerName: parseString(employerName, "employer name", false),
  }
  return newEntry;
}; 

const toNewHealthCheckEntry = ({ description, specialist, date, diagnosisCodes, healthCheckRating}:NewHealthCheckEntryFields): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    type: "HealthCheck",
    description: parseString(description, "entry description"),
    specialist: parseString(specialist, "entry specialist"),
    date: parseDate(date, "entry date"),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes, "diagnosis codes", false) : [],
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  }
  return newEntry;
}; 


const parseEntryArray = (arrayValues: unknown[], arrayName: string, mandatory:boolean=true): Entry[] => {
  var entries:Entry[] = [];
  if (!arrayValues && mandatory) {
    throw new Error(`Missing ${arrayName}`);
  }
  if (!isPureArrayOf<Entry>(arrayValues)) {
      throw new Error(`Incorrect ${arrayName}`);
  }
  arrayValues.forEach(entry => {
    if(entry.type === EntryType.Hospital){
      entries.push(
        {
          id: parseString(entry.id, "id"),
          type: EntryType.Hospital,
          description: parseString(entry.description, "entry description"),
          specialist: parseString(entry.specialist, "entry specialist"),
          date: parseDate(entry.date, "entry date"),
          diagnosisCodes: entry.diagnosisCodes ? parseStringArray(entry.diagnosisCodes, "diagnosis codes", false) : [],
          discharge: toDischarge(entry.discharge!)
        }
      );
    }
    if(entry.type === EntryType.OccupationalHealthcare){
      entries.push( 
        {
          id: parseString(entry.id, "id"),
          type: EntryType.OccupationalHealthcare,
          description: parseString(entry.description, "entry description"),
          specialist: parseString(entry.specialist, "entry specialist"),
          date: parseDate(entry.date, "entry date"),
          diagnosisCodes: entry.diagnosisCodes ? parseStringArray(entry.diagnosisCodes, "diagnosis codes", false) : [],
          sickLeave: entry.sickLeave ? toSickLeave(entry.sickLeave) : toSickLeave({startDate:'2021-05-19',endDate:'2021-05-19'}) ,
          employerName: parseString(entry.employerName, "employer name", false),
        });
    }
    if(entry.type === EntryType.HealthCheck){
      entries.push(
        {
          id: parseString(entry.id, "id"),
          type: EntryType.HealthCheck,
          description: parseString(entry.description, "entry description"),
          specialist: parseString(entry.specialist, "entry specialist"),
          date: parseDate(entry.date, "entry date"),
          diagnosisCodes: entry.diagnosisCodes ? parseStringArray(entry.diagnosisCodes, "diagnosis codes", false) : [],
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      }
      );
    }
  });
  return entries;
};

const parseStringArray = (stringArrayValues: unknown[], stringArrayName: string, mandatory:boolean=true): string[] => {
  if (!stringArrayValues && mandatory) {
    throw new Error(`Missing ${stringArrayName}`);
  }
  if (!isPureArrayOfStrings(stringArrayValues)) {
      throw new Error(`Incorrect ${stringArrayName}`);
  }
  return stringArrayValues;
};

const parseDischarge = (dischargeValues: unknown, dischargeName: string, mandatory:boolean=true): Discharge => {
  if (!dischargeValues && mandatory) {
    throw new Error(`Missing ${dischargeName}`);
  }
  if(!isDischarge(dischargeValues)){
    throw new Error(`Incorrect ${dischargeName}: ${dischargeValues}`);
  }
  const newDischarge: Discharge = {
    date: parseDate(dischargeValues.date, "discharge date"),
    criteria: parseString(dischargeValues.criteria, "discharge criteria")
  };
  return newDischarge;
};

const parseSickLeave = (values: unknown, name: string, mandatory:boolean=true): SickLeave => {
  if (!values && mandatory) {
    throw new Error(`Missing ${name}`);
  }
  if(!isSickLeave(values)){
    throw new Error(`Incorrect ${name}: ${values}`);
  }
  return toSickLeave(values);
};

const parseString = (stringValue: unknown, stringName: string, mandatory:boolean=true): string => {
  if (!stringValue && mandatory) {
    throw new Error(`Missing ${stringName}`);
  }
  if (!isString(stringValue)) {
      throw new Error(`Incorrect ${stringName}: : ${stringValue}`);
  }
  return stringValue;
};

const isDischarge = (object: any): object is Discharge => {
  return 'date' in object && 'criteria' in object;
};

const isSickLeave = (object: any): object is SickLeave => {
  return 'startDate' in object && 'endDate' in object;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

function isPureArrayOf<T>(array: any[]): array is T[] {
  for (const item of array) {
    if ((item as T) === undefined) {
      return false;
    }
  }
  return true;
}

function isPureArrayOfStrings(array: any[]): array is string[] {
  var retVal:boolean = true;
  if(array === undefined){
    retVal = false;
  } else {
    array.forEach(item => {
      if (!isString(item)) {
        retVal = false;
      }
    })
  }
  return retVal;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown, dateName:string, mandatory:boolean=true): string => {
  if (!date && mandatory) {
    throw new Error(`Missing ${dateName}`);
}
if (!isString(date) || !isDate(date)) {
        throw new Error(`Incorrect ${dateName}: ${date}`);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
      throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const isHealthCheckRating= (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export {toNewPatient,toNewHospitalEntry, toNewOccupationalHealthCareEntry, toNewHealthCheckEntry, assertNever};