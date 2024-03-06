package com.leonardo.spring_sistema_de_pedidos.config;

import java.util.Optional;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

@Configuration
public class AuditorAwareConfig implements AuditorAware<Usuario> {

    @SuppressWarnings("null")
    @Override
    public Optional<Usuario> getCurrentAuditor() {
        return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(Usuario.class::cast);
    }

}
