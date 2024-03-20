package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import org.springframework.stereotype.Service;

import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;

@Service
public class ArquivoService {

    public final ArquivoRepository arquivoRepository;

    public ArquivoService(ArquivoRepository arquivoRepository) {
        this.arquivoRepository = arquivoRepository;
    }

    public List<Arquivo> findById(Pedido id) {
        return arquivoRepository.findAllByPedido(id);
    }
}
