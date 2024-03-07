// package com.leonardo.spring_sistema_de_pedidos.entities;

// import java.time.LocalDateTime;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// @Table(name = "pedidos_auditoria")
// public class Auditoria {

// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(name = "id")
// private Long id;

// @Column
// private String action;

// @Column
// private LocalDateTime action_date;

// @Column
// private Integer user_id;

// @Column
// private String prev_value;

// @Column
// private String new_value;
// }
