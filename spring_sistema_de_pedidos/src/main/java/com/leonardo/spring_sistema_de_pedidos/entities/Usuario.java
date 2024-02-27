package com.leonardo.spring_sistema_de_pedidos.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "co_acesso")
public class Usuario implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String usuario;

    @Column(name = "fullname")
    private String nomeCompleto;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "secretpin")
    private String email;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "adm")
    private Integer nivel;

    @Column(name = "imagem", nullable = true)
    private String imagem;

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "criado_em", updatable = false, nullable = true)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "editado_em", nullable = true)
    private LocalDateTime editadoEm;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        switch (this.nivel) {
            case 9:
                return List.of(new SimpleGrantedAuthority("9"), new SimpleGrantedAuthority("7"),
                        new SimpleGrantedAuthority("5"), new SimpleGrantedAuthority("1"));
            case 7:
                return List.of(new SimpleGrantedAuthority("7"), new SimpleGrantedAuthority("5"),
                        new SimpleGrantedAuthority("1"));
            case 5:
                return List.of(new SimpleGrantedAuthority("5"), new SimpleGrantedAuthority("1"));
            case 1:
                return List.of(new SimpleGrantedAuthority("1"));
            default:
                return null;
        }
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (this.nivel != 0) {
            return true;
        }
        return false;
    }
}
