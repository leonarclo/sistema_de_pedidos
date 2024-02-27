package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

    public UsuarioResponseDTO update(UsuarioRequestDTO updateUser, Long id) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setSkipNullEnabled(true);

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

}
