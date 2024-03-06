package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, Long> {

    List<Arquivo> findAllByChave(String chave);

    boolean existsByPedidoAndArquivo(Pedido findPedido, String arq);

    @Transactional
    Long deleteByArquivo(String filename);

}
