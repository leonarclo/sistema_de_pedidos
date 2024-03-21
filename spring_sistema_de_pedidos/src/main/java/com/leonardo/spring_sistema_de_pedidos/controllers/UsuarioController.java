package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;
import com.leonardo.spring_sistema_de_pedidos.services.UsuarioService;

@RestController
@RequestMapping("/api/v1")
public class UsuarioController {

    public final UsuarioService usuarioService;
    public final UsuarioRepository usuarioRepository;

    UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/buscar-usuarios/{id}")
    public ResponseEntity<List<UsuarioResponseDTO>> findAll(@PathVariable @NonNull Long id) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (usuario.getNivel() == 7) {
            List<UsuarioResponseDTO> usuarios = usuarioService.findAllByNivel(id, usuario.getNivel());
            return ResponseEntity.ok(usuarios);
        } else if (usuario.getNivel() > 7) {
            List<UsuarioResponseDTO> usuarios = usuarioService.findAll();
            return ResponseEntity.ok(usuarios);
        }
        return null;

    }

    @PostMapping("/editar-usuario/{id}")
    public ResponseEntity<UsuarioResponseDTO> update(@RequestBody UsuarioRequestDTO updateUser,
            @PathVariable @NonNull Long id) {
        UsuarioResponseDTO usuario = usuarioService.update(updateUser, id);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/encrypt")
    public void encryptAllPasswords() {
        usuarioService.encryptAllPasswords();
    }

}
