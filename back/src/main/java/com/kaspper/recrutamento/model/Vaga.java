package com.kaspper.recrutamento.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.kaspper.recrutamento.util.TipoVagaEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Vaga {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private TipoVagaEnum tipo;
    private Double salario;
}
