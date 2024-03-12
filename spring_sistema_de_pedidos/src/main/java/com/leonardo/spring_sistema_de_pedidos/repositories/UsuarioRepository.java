package com.leonardo.spring_sistema_de_pedidos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>, RevisionRepository<Usuario, Long, Long> {

    UserDetails findByUsuario(String usuario);

    List<Usuario> findAllByOrderByIdDesc();

    Usuario findByPassword(String password);

    Usuario findByUsuarioAndPassword(String usuario, String rawPassword);
}
