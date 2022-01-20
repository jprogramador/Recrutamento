package com.kaspper.recrutamento.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.kaspper.recrutamento.model.Candidato;

public class CustomCandidatoRepositoryImpl implements CustomCandidatoRepository{

	@PersistenceContext
    private EntityManager entityManager;

    @Override
	public List<Candidato> findCandidatoByDescricoes(Set<String> descricoes) {
    	CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Candidato> query = cb.createQuery(Candidato.class);
        Root<Candidato> candidato = query.from(Candidato.class);

        Path<String> descricaoPath = candidato.get("descricao");

        List<Predicate> predicates = new ArrayList<>();
        for (String descricao : descricoes) {
            predicates.add(cb.like(cb.lower(descricaoPath), "%"+descricao.toLowerCase()+"%"));
        }
        query.select(candidato)
            .where(cb.or(predicates.toArray(new Predicate[predicates.size()])));

        return entityManager.createQuery(query)
            .getResultList();
	}

}
