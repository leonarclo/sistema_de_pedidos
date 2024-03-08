package com.leonardo.spring_sistema_de_pedidos.auditory;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Attribute;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.Type;

public class AuditUtil {

    private Object target;
    private EntityManager entityManager;

    public AuditUtil(Object target, EntityManager entityManager) {
        this.target = target;
        this.entityManager = entityManager;
    }

    public List<AuditLog> getAuditLogs() {
        List<AuditLog> logs = new ArrayList<>();
        EntityType<?> entityType = entityManager.getMetamodel().entity(target.getClass());
        for (Attribute<?, ?> attribute : entityType.getDeclaredAttributes()) {
            if (!isUpdatable(attribute)) {
                continue;
            }

            Object oldValue = getOldValue(attribute);
            Object newValue = getValue(attribute);
            if (oldValue != null || newValue != null) {
                logs.add(new AuditLog(entityType.getName(), target.getClass().getSimpleName(), attribute.getName(),
                        oldValue != null ? oldValue.toString() : null, newValue != null ? newValue.toString() : null));
            }
        }
        return logs;
    }

    private boolean isUpdatable(Attribute<?, ?> attribute) {
        Type<?> type = attribute.getDeclaringType();
        SingularAttribute<?, ?> idAttribute = ((EntityType<?>) type).getId(Long.class);
        return !attribute.equals(idAttribute);
    }

    private Object getOldValue(Attribute<?, ?> attribute) {
        Type<?> type = attribute.getDeclaringType();
        try {
            Field field = type.getJavaType().getDeclaredField(attribute.getName());
            field.setAccessible(true);
            return field.get(target);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Object getValue(Attribute<?, ?> attribute) {
        Type<?> type = attribute.getDeclaringType();
        try {
            Field field = type.getJavaType().getDeclaredField(attribute.getName());
            field.setAccessible(true);
            return field.get(target);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}