package com.leonardo.spring_sistema_de_pedidos.auditory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class AuditorAwareConfig {

    @Bean
    AuditorAware<String> auditorProvider() {
        return new AuditAwareImpl();
    }
}
