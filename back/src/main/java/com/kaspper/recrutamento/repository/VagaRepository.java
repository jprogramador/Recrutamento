package com.kaspper.recrutamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kaspper.recrutamento.model.Vaga;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {
	Vaga findByNome(String nome);
}