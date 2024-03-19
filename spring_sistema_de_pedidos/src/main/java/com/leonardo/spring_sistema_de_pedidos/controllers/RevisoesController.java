package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
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
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.ProdutoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/v1")
public class RevisoesController {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public RevisoesController(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository,
            ProdutoRepository produtoRepository, UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;

    }

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @GetMapping("/pedido-revisions/{id}")
    public List<Object[]> getPedidoRevisoes(@PathVariable @NonNull Long id) {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Pedido.class, false, true)
                .add(AuditEntity.id().eq(id))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/item-revisions/{id}")
    public List<Object[]> getItensRevisoes(@PathVariable @NonNull Long id) {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(ItemPedido.class, false, false)
                .add(AuditEntity.property("pedido_id").eq(id))
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/usuarios-revisions")
    public List<Object[]> getUsuariosRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Usuario.class, false, false)
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/produtos-revisions")
    public List<Object[]> getProdutosRevisoes() {
        AuditReader auditReader = AuditReaderFactory.get(entityManager);
        AuditQuery auditQuery = auditReader.createQuery().forRevisionsOfEntity(Produto.class, false, false)
                .addOrder(AuditEntity.revisionNumber().desc())
                .setMaxResults(5);
        return auditQuery.getResultList();
    }
}
