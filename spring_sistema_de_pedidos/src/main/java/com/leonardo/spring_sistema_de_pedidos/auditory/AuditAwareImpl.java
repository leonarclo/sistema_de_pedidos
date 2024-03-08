package com.leonardo.spring_sistema_de_pedidos.auditory;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

public class AuditAwareImpl implements AuditorAware<String> {

    @SuppressWarnings("null")
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario user = (Usuario) authentication.getPrincipal();
        return Optional.of(user.getUsuario().toString());
    }

}
