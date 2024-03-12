package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.data.history.Revisions;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Produto;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/v1")
public class RevisoesController {

    private final PedidoRepository pedidoRepository;
    private final ArquivoRepository arquivoRepository;

    public RevisoesController(PedidoRepository pedidoRepository, ArquivoRepository arquivoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.arquivoRepository = arquivoRepository;
    }

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/revisions/{id}")
    public List<String> getRevisoesById(@PathVariable @NonNull Long id) {
        return pedidoRepository.findRevisions(id).stream()
                .map(Object::toString)
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/pedidos-revisions")
    public List<Object[]> getPedidoRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Pedido.class, false, false)
                .add(AuditEntity.revisionType().eq(RevisionType.MOD))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/itens-revisions")
    public List<Object[]> getItensRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(ItemPedido.class, false, false)
                .add(AuditEntity.revisionType().eq(RevisionType.MOD))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/usuarios-revisions")
    public List<Object[]> getUsuariosRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Usuario.class, false, false)
                .add(AuditEntity.revisionType().eq(RevisionType.MOD))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/produtos-revisions")
    public List<Object[]> getProdutosRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Produto.class, false, false)
                .add(AuditEntity.revisionType().eq(RevisionType.MOD))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }
}
