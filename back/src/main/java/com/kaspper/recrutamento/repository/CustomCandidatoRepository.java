package com.kaspper.recrutamento.repository;

import java.util.List;
import java.util.Set;

import com.kaspper.recrutamento.model.Candidato;

public interface CustomCandidatoRepository {
	List<Candidato> findCandidatoByDescricoes(Set<String> descricoes);	
}