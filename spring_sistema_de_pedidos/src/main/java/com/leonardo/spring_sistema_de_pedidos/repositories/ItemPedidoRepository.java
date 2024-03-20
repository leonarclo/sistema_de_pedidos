package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.stereotype.Repository;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

@Repository
public interface ItemPedidoRepository
        extends JpaRepository<ItemPedido, Long>, RevisionRepository<ItemPedido, Long, Long> {

    List<ItemPedido> findAllByOrderByIdDesc();

    List<ItemPedido> findAllByPedido(Pedido id);
}