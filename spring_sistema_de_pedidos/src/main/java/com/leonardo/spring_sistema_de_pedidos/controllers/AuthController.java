package com.leonardo.spring_sistema_de_pedidos.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.LoginDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.UsuarioMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;
import com.leonardo.spring_sistema_de_pedidos.services.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final AuthService authService;

    AuthController(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository,
            AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO login) {
        UsernamePasswordAuthenticationToken loginPassword = new UsernamePasswordAuthenticationToken(
                login.getUsuario(),
                login.getPassword());
        authenticationManager.authenticate(loginPassword);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/registrar")
    public ResponseEntity postMethodName(@RequestBody UsuarioRequestDTO novoUsuario) {
        if (usuarioRepository.findByUsuario(novoUsuario.getUsuario()) != null) {
            return ResponseEntity.badRequest().build();
        }
        String hashedPassword = new BCryptPasswordEncoder().encode(novoUsuario.getPassword());
        UsuarioRequestDTO usuario = new UsuarioRequestDTO(novoUsuario.getUsuario(), novoUsuario.getNomeCompleto(),
                novoUsuario.getDepartamento(), novoUsuario.getEmail(), hashedPassword, novoUsuario.getNivel());
        usuarioRepository.save(UsuarioMapper.toUserRequest(usuario));
        return ResponseEntity.ok().build();
    }

}
