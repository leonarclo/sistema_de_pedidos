package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.ArquivoDTO;
import com.leonardo.spring_sistema_de_pedidos.services.ArquivoService;

@RestController
@RequestMapping("/api/v1")
public class ArquivoController {

    public final ArquivoService arquivoService;

    public ArquivoController(ArquivoService arquivoService) {
        this.arquivoService = arquivoService;
    }

    @GetMapping("/buscar-arquivos")
    public ResponseEntity<List<ArquivoDTO>> findByChave(@RequestParam(name = "chave") String chave) {
        try {
            List<ArquivoDTO> arquivos = arquivoService.findByChave(chave);
            return ResponseEntity.ok(arquivos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
