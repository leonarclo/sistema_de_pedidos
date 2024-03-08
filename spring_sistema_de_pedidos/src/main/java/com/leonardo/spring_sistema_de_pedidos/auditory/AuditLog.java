package com.leonardo.spring_sistema_de_pedidos.auditory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuditLog {
    private String entityName;
    private String entitySimpleName;
    private String propertyName;
    private String oldValue;
    private String newValue;

    public AuditLog(String entityName, String entitySimpleName, String propertyName, String oldValue, String newValue) {
        this.entityName = entityName;
        this.entitySimpleName = entitySimpleName;
        this.propertyName = propertyName;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
