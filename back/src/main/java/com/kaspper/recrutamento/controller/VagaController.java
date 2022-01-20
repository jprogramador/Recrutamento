package com.kaspper.recrutamento.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.kaspper.recrutamento.model.Vaga;
import com.kaspper.recrutamento.repository.VagaRepository;

@RestController
@RequestMapping("/api/v1")
public class VagaController {
	@Autowired
	private VagaRepository vagaRepository;
	
	@GetMapping("/vagas")
	public List <Vaga> GetAllVagas(){
		return vagaRepository.findAll();
	}
	
	@GetMapping("/vagas/{id}")
	public ResponseEntity <Vaga> GetVagaById(@PathVariable(value="id") Long vagaId)
		throws GenericException{
			Vaga vaga = vagaRepository.findById(vagaId)
					.orElseThrow(()->new GenericException("Vaga não encontrado para o id " + vagaId+"."));
			return ResponseEntity.ok().body(vaga);
	}	
	
	@PutMapping("/vagas")
    public Vaga updateVaga(@Valid @RequestBody Vaga vaga) throws GenericException {
		vagaRepository.findById(vaga.getId())
				.orElseThrow(()->new GenericException("Vaga não encontrado para o id " + vaga.getId()+"."));
		
        return vagaRepository.save(vaga);
    }
	
	@DeleteMapping("/vagas/{id}")
    public Map<String, Boolean> deleteVaga(@PathVariable(value = "id") Long vagaId)
         throws GenericException {
        Vaga vaga = vagaRepository.findById(vagaId)
       .orElseThrow(() -> new GenericException("Vaga não encontrado para o id " + vagaId+"."));

        vagaRepository.delete(vaga);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
	
	@PostMapping("/vagas")
    public Vaga createVaga(@Valid @RequestBody Vaga vaga) throws GenericException {
		Vaga vagaPesq = vagaRepository.findByNome(vaga.getNome());
		
		if (vagaPesq != null) {
			throw new GenericException("Vaga "+vaga.getNome()+" já existe.");
		}		
		
        return vagaRepository.save(vaga);
    }
}
