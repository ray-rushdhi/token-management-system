package com.hSenid.demo.services;

import com.hSenid.demo.exception.PatientNotFoundException;
import com.hSenid.demo.models.Patient;
import com.hSenid.demo.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    private final PatientRepository patientRepository;

    private final SequenceGeneratorService service;

    @Autowired
    public PatientService(PatientRepository patientRepository, SequenceGeneratorService service) {
        this.patientRepository = patientRepository;
        this.service = service;
    }

    public List<Patient> findAllPatients() {
        return patientRepository.findAll();
    }

    public Patient addPatient(Patient patient) {
        patient.setId(service.getSequenceNumber(Patient.SEQUENCE_NAME));
        logger.info("ID for the patient updated automatically");
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient findPatientById(int id) {
        return patientRepository.findPatientById(id).orElseThrow(() -> {
            logger.error("Patient by ID {} was not found", id);
            return new PatientNotFoundException("Patient by ID "+id+" was not found");
        });
    }

    public void deletePatient(int id) {
        patientRepository.deletePatientById(id);
    }
}
