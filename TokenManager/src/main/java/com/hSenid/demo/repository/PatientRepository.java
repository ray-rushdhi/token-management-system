package com.hSenid.demo.repository;

import com.hSenid.demo.models.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<Patient,Long> {
    void deletePatientById(int id);
    Optional<Patient> findPatientById(int id);
}
