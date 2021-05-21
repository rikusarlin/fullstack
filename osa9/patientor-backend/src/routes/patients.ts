import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalHealthCareEntry} from '../utils';
import {Patient, EntryType} from '../types'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (_req, res) => {
  res.send(patientService.getPatientData(_req.params.id));
});

router.get('/:id/entries', (_req, res) => {
  res.send(patientService.getPatientEntries(_req.params.id));
});

router.post('/:id/entries', (_req, res) => {
  try{
    const patient:Patient|undefined = patientService.getPatientData(_req.params.id);
    if(patient === undefined) {
      res.status(404).json({ error: 'Patient not found'});
    }
    if(!('type' in _req.body)){
      res.status(400).json({ error: 'Invalid entry, type not found'});
    }
    switch(_req.body.type){
      case EntryType.Hospital: {
        const newEntry = toNewHospitalEntry(_req.body);
        const addedEntry = patientService.addHospitalEntry(patient!, newEntry);
        res.json(addedEntry);
        break;    
      };
      case EntryType.HealthCheck: {
        const newEntry = toNewHealthCheckEntry(_req.body);
        const addedEntry = patientService.addHealthCheckEntry(patient!, newEntry);
        res.json(addedEntry);
        break;    

      };
      case EntryType.OccupationalHealthcare: {
        const newEntry = toNewOccupationalHealthCareEntry(_req.body);
        const addedEntry = patientService.addOccupationalHealthCareEntry(patient!, newEntry);
        res.json(addedEntry);
        break;    
      };
      default:
          res.status(400).json({
            error: 'Invalid entry type'
        });
    };
  } catch (e){
    if(e instanceof Error){
      res.status(400).json({
          error: e.message
      });
  }
}});

router.post('/', (req, res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e){
    if(e instanceof Error){
      res.status(400).json({
          error: e.message
      });
  }  }
});

export default router;