package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByOrderByIdDesc();

    List<Pedido> findByConsultorOrderByIdDesc(String consultor);

    List<Pedido> findByCriadoPorOrderByIdDesc(Usuario consultorId);

    @Query("select e from Pedido e where trim(e.cnpj) like concat(:cnpj,'%')")
    List<Pedido> findFirstByCnpj(@Param("cnpj") String cnpj);
}
