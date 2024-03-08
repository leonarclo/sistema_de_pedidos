package com.leonardo.spring_sistema_de_pedidos.auditory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.leonardo.spring_sistema_de_pedidos.entities.Auditoria;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

@Component
public class AuditListener {

    @Autowired
    private AuditorAware<String> auditorAware;

    @Autowired
    private EntityManager entityManager;

    @PrePersist
    public void prePersist(Object target) {
        audit(target, "Inserido");
    }

    @PreUpdate
    public void preUpdate(Object target) {
        audit(target, "Atualizado");
    }

    @PreRemove
    public void preRemove(Object target) {
        audit(target, "Excluído");
    }

    @Transactional
    protected void audit(Object target, String acao) {
        Optional<String> auditorNameOptional = auditorAware.getCurrentAuditor();

        if (auditorNameOptional.isPresent()) {
            String auditorName = auditorNameOptional.get();

            AuditUtil auditUtil = new AuditUtil(target, entityManager);
            List<AuditLog> logs = auditUtil.getAuditLogs();

            logs.forEach(log -> {
                Auditoria auditoria = new Auditoria();
                auditoria.setEntidade(log.getEntityName());
                auditoria.setEntidadeName(log.getEntitySimpleName());
                auditoria.setAcao(acao);
                auditoria.setPropriedade(log.getPropertyName());
                auditoria.setValorPrevio(log.getOldValue());
                auditoria.setValorAtual(log.getNewValue());
                auditoria.setDataHora(LocalDateTime.now());
                auditoria.setUsuario(auditorName);
                entityManager.persist(auditoria);
            });
        }
    }
}
