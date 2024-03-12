package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import com.leonardo.spring_sistema_de_pedidos.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>, RevisionRepository<Produto, Long, Long> {

    List<Produto> findAllByCategoria(Integer categoria);

}
