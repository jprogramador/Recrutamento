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
import com.kaspper.recrutamento.model.Perfil;
import com.kaspper.recrutamento.repository.PerfilRepository;

@RestController
@RequestMapping("/api/v1")
public class PerfilController {
	@Autowired
	private PerfilRepository perfilRepository;
	
	@GetMapping("/perfis")
	public List <Perfil> GetAllPerfis(){
		return perfilRepository.findAll();
	}
	
	@GetMapping("/perfis/{id}")
	public ResponseEntity <Perfil> GetPerfilById(@PathVariable(value="id") Long perfilId)
		throws GenericException{
			Perfil perfil = perfilRepository.findById(perfilId)
					.orElseThrow(()->new GenericException("Perfil não encontrado para o id " + perfilId+"."));
			return ResponseEntity.ok().body(perfil);
	}	
	
	@PutMapping("/perfis")
    public Perfil updatePerfil(@Valid @RequestBody Perfil perfil) throws GenericException {
		perfilRepository.findById(perfil.getId())
				.orElseThrow(()->new GenericException("Perfil não encontrado para o id " + perfil.getId()+"."));
		
        return perfilRepository.save(perfil);
    }
	
	@DeleteMapping("/perfis/{id}")
    public Map<String, Boolean> deletePerfil(@PathVariable(value = "id") Long perfilId)
         throws GenericException {
        Perfil perfil = perfilRepository.findById(perfilId)
       .orElseThrow(() -> new GenericException("Perfil não encontrado para o id " + perfilId+"."));

        perfilRepository.delete(perfil);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
	
	@PostMapping("/perfis")
    public Perfil createPerfil(@Valid @RequestBody Perfil perfil) throws GenericException {
		Perfil perfilPesq = perfilRepository.findByNome(perfil.getNome());
		
		if (perfilPesq != null) {
			throw new GenericException("Perfil "+perfil.getNome()+" já existe.");
		}		
		
        return perfilRepository.save(perfil);
    }
}
