package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.UsuarioResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

public class UsuarioMapper {

    private static final ModelMapper modelMaper = new ModelMapper();

    public static UsuarioResponseDTO toUserResponse(Usuario usuario) {
        return modelMaper.map(usuario, UsuarioResponseDTO.class);
    }

    public static List<UsuarioResponseDTO> toUserList(List<Usuario> usuarios) {
        return usuarios.stream().map(usuario -> toUserResponse(usuario)).collect(Collectors.toList());
    }

    public static Usuario toUserRequest(UsuarioRequestDTO usuarioDto) {
        return modelMaper.map(usuarioDto, Usuario.class);
    }

}
