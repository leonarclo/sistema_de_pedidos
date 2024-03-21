package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.UsuarioMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioResponseDTO> findAll() {
        return UsuarioMapper.toUserList(usuarioRepository.findAllByOrderByIdDesc());
    }

    public List<UsuarioResponseDTO> findAllByNivel(Long id, Integer nivel) {
        return UsuarioMapper
                .toUserList(usuarioRepository.findAllByIdEqualsOrNivelLessThanOrderByIdDesc(id, nivel));
    }

    @SuppressWarnings("null")
    public UsuarioResponseDTO update(UsuarioRequestDTO updateUser, @NonNull Long id) {
        ModelMapper modelMapper = new ModelMapper();

        Usuario findUser = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        String hashedPassword = new BCryptPasswordEncoder().encode(updateUser.getPassword());

        UsuarioResponseDTO userUpdated = UsuarioMapper.toUserResponse(findUser);
        if (updateUser.getPassword() == "" || updateUser.getPassword() == null) {
            updateUser.setPassword(findUser.getPassword());
        } else {
            updateUser.setPassword(hashedPassword);
        }
        modelMapper.map(updateUser, findUser);
        usuarioRepository.save(findUser);
        return userUpdated;
    }

    @Transactional
    public void encryptAllPasswords() {
        Iterable<Usuario> usuarios = usuarioRepository.findAll();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        for (Usuario usuario : usuarios) {
            if (!passwordEncoder.matches(usuario.getPassword(), usuario.getPassword())) {
                String hashedPassword = passwordEncoder.encode(usuario.getPassword());
                usuario.setPassword(hashedPassword);
                usuarioRepository.save(usuario);
            }
        }
    }
}
