package com.leonardo.spring_sistema_de_pedidos.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "co_auditoria")
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column
    private String entidade;

    @Column(name = "entidade_id")
    private String entidadeName;

    @Column
    private String acao;

    @Column
    private String propriedade;

    @Column(name = "valor_previo")
    private String valorPrevio;

    @Column(name = "valor_atual")
    private String valorAtual;

    @Column
    private String usuario;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;

}
