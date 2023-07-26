package com.hSenid.demo.controllers;

import com.hSenid.demo.models.Patient;
import com.hSenid.demo.services.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.findAllPatients();
        logger.info("Successfully accessed all the patients");
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable ("id") int id) {
        Patient patient = patientService.findPatientById(id);
        logger.info("Successfully retrieved {} from the database",patientService.findPatientById(id));
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        Patient newPatient = patientService.addPatient(patient);
        logger.info("Successfully added patient {} to the database",newPatient.getName());
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient) {
        Patient updatePatient = patientService.updatePatient(patient);
        logger.info("Successfully updated patient {}",updatePatient.getName());
        return new ResponseEntity<>(updatePatient, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable ("id") int id) {
        patientService.deletePatient(id);
        logger.info("Patient {} successfully deleted from the database",patientService.findPatientById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
