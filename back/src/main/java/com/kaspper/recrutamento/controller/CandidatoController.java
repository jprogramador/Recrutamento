package com.kaspper.recrutamento.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kaspper.recrutamento.exception.GenericException;
import com.kaspper.recrutamento.model.Candidato;
import com.kaspper.recrutamento.repository.CandidatoRepository;

@RestController
@RequestMapping("/api/v1")
public class CandidatoController {
	@Autowired
	private CandidatoRepository candidatoRepository;
	
	@GetMapping("/candidatos")
	public List <Candidato> GetAllCandidatos(){
		return candidatoRepository.findAll();
	}
	
	@GetMapping("/candidatos/{id}")
	public ResponseEntity <Candidato> GetCandidatoById(@PathVariable(value="id") Long candidatoId)
		throws GenericException{
			Candidato candidato = candidatoRepository.findById(candidatoId)
					.orElseThrow(()->new GenericException("Candidato não encontrado para o id " + candidatoId+"."));
			return ResponseEntity.ok().body(candidato);
	}
	
	@GetMapping("/candidatosDescricao/{parametro}")
	public List<Candidato> GetCandidatoByDescricao(@PathVariable(value="parametro") String parametro){
		parametro = parametro.replaceAll(",", "");
		parametro = parametro.replaceAll("\\.", "");
		parametro = parametro.replaceAll(" e ", " ");
		Set<String> colecaoSet = new HashSet<String>(Arrays.asList(parametro.split(" ")));
        return candidatoRepository.findCandidatoByDescricoes(colecaoSet);
	}
	
	@PutMapping("/candidatos")
    public Candidato updateCandidato(@Valid @RequestBody Candidato candidato) throws GenericException {
		return candidatoRepository.save(candidato);
    }
	
	@DeleteMapping("/candidatos/{id}")
    public Map<String, Boolean> deleteCandidato(@PathVariable(value = "id") Long candidatoId)
         throws GenericException {
        Candidato candidato = candidatoRepository.findById(candidatoId)
       .orElseThrow(() -> new GenericException("Candidato não encontrado para o id " + candidatoId+"."));

        candidatoRepository.delete(candidato);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
	
	@PostMapping("/candidatos")
    public Candidato createCandidato(@Valid @RequestBody Candidato candidato) {
		return candidatoRepository.save(candidato);
    }
}
