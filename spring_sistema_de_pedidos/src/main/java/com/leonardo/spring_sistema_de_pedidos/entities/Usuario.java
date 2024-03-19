package com.leonardo.spring_sistema_de_pedidos.entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Audited
@ToString(callSuper = true)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@EntityListeners(AuditingEntityListener.class)
@Table(name = "co_acesso")
public class Usuario implements UserDetails {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", unique = true, length = 20)
    private String usuario;

    @Column(name = "fullname", length = 100)
    private String nomeCompleto;

    @Column(name = "departamento", length = 20)
    private String departamento;

    @Column(name = "secretpin", length = 150)
    private String email;

    @NotAudited
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "adm", length = 1)
    private Integer nivel;

    @Column(name = "imagem", nullable = true)
    private String imagem;

    @CreatedBy
    @Column(name = "criado_por", length = 50)
    private String criadoPor;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @LastModifiedBy
    @Column(name = "editado_por", length = 50)
    private String editadoPor;

    @LastModifiedDate
    @Column(name = "editado_em")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
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
