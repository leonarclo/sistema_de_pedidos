package com.leonardo.spring_sistema_de_pedidos.auditor;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

public class AuditorAwareImpl implements AuditorAware<Long> {

    @Override
    // public Optional<Usuario> getCurrentAuditor() {
    // return Optional.ofNullable(SecurityContextHolder.getContext())
    // .map(SecurityContext::getAuthentication)
    // .filter(Authentication::isAuthenticated)
    // .map(Authentication::getName)
    // .flatMap(Usuario.class::cast);
    // }

    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario user = (Usuario) authentication.getPrincipal();
        return Optional.of(user.getId());
    }

}
