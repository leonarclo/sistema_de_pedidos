package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.PedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.payload.PedidoRequest;
import com.leonardo.spring_sistema_de_pedidos.services.PedidoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1")
public class PedidoController {

    public final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping("/buscar-pedidos")
    public ResponseEntity<List<PedidoDTO>> findAll() {
        try {
            List<PedidoDTO> pedidos = pedidoService.findAll();
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/inserir-pedido")
    public ResponseEntity<Pedido> save(@RequestBody PedidoRequest pedido) {
        try {
            Pedido novoPedido = pedidoService.save(pedido);
            return ResponseEntity.ok(novoPedido);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/editar-pedido")
    public ResponseEntity<PedidoDTO> update(@RequestBody PedidoDTO pedido) {
        try {
            PedidoDTO novoPedido = pedidoService.update(pedido);
            return ResponseEntity.ok(novoPedido);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
