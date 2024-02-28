package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByOrderByIdDesc();

    List<Pedido> findAllByConsultorOrderByIdDesc(String consultor);

    List<Pedido> findByConsultorOrConsultorId(String consultor, Integer consultorId);
}
