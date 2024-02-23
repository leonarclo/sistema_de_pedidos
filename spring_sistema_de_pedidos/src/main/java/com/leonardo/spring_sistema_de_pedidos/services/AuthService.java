package com.leonardo.spring_sistema_de_pedidos.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;

@Service
public class AuthService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsuario(username);
    }

}
