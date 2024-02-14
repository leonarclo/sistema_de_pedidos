package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.leonardo.spring_sistema_de_pedidos.dto.ArquivoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.ArquivoMapper;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;

@Service
public class ArquivoService {

    public final ArquivoRepository arquivoRepository;

    public ArquivoService(ArquivoRepository arquivoRepository) {
        this.arquivoRepository = arquivoRepository;
    }

    public List<ArquivoDTO> findByChave(String chave) {
        return arquivoRepository.findAllByChave(chave).stream().map(ArquivoMapper::toArquivoDTO)
                .collect(Collectors.toList());
    }
}
