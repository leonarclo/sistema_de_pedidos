package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import com.leonardo.spring_sistema_de_pedidos.dto.ArquivoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;

public class ArquivoMapper {

    public static ArquivoDTO toArquivoDTO(Arquivo arquivo) {
        return new ArquivoDTO(arquivo.getId(), arquivo.getChave(), arquivo.getArquivo());

    }

    public static Arquivo toArquivoEntity(ArquivoDTO arquivoDTO) {
        Arquivo arquivo = new Arquivo();
        arquivo.setId(arquivoDTO.id());
        arquivo.setChave(arquivoDTO.chave());
        arquivo.setArquivo(arquivoDTO.arquivo());
        return arquivo;
    }
}
