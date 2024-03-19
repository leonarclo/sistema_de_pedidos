package com.leonardo.spring_sistema_de_pedidos.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.leonardo.spring_sistema_de_pedidos.dto.LoginDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.TokenResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.UsuarioMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;
import com.leonardo.spring_sistema_de_pedidos.services.TokenService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final TokenService tokenService;

    AuthController(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository,
            TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody LoginDTO login) {
        Usuario findUser = usuarioRepository.findByUsuarioAndPassword(login.getUsuario(), login.getPassword());

        if (findUser != null) {
            String hashedPassword = new BCryptPasswordEncoder().encode(findUser.getPassword());
            findUser.setPassword(hashedPassword);
            usuarioRepository.save(findUser);
        }
        UsernamePasswordAuthenticationToken loginPassword = new UsernamePasswordAuthenticationToken(
                login.getUsuario(),
                login.getPassword());
        var auth = authenticationManager.authenticate(loginPassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        return ResponseEntity.ok(new TokenResponseDTO(token));

    }

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioResponseDTO> registrar(@RequestBody UsuarioRequestDTO novoUsuario) {
        if (usuarioRepository.findByUsuario(novoUsuario.getUsuario()) != null) {
            return ResponseEntity.badRequest().build();
        }
        String hashedPassword = new BCryptPasswordEncoder().encode(novoUsuario.getPassword());
        Usuario usuario = new Usuario();
        usuario.setUsuario(novoUsuario.getUsuario());
        usuario.setNomeCompleto(novoUsuario.getNomeCompleto());
        usuario.setDepartamento(novoUsuario.getDepartamento());
        usuario.setEmail(novoUsuario.getEmail());
        usuario.setPassword(hashedPassword);
        usuario.setNivel(novoUsuario.getNivel());
        usuarioRepository.save(usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> userInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(UsuarioMapper.toUserResponse(usuario));
    }

}
