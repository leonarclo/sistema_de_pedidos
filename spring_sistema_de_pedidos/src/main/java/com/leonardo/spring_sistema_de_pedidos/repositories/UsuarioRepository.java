package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    UserDetails findByUsuario(String usuario);

    List<Usuario> findAllByOrderByIdDesc();

    Usuario findByPassword(String password);
}
