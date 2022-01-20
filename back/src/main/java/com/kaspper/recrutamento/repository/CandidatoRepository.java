package com.kaspper.recrutamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kaspper.recrutamento.model.Candidato;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long>, CustomCandidatoRepository {
}