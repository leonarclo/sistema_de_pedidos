package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.services.ItemPedidoService;

@RestController
@RequestMapping("/api/v1")
public class ItemPedidoController {

    public final ItemPedidoService itemPedidoService;
    public final PedidoRepository pedidoRepository;

    ItemPedidoController(ItemPedidoService itemPedidoService, PedidoRepository pedidoRepository) {
        this.itemPedidoService = itemPedidoService;
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/buscar-itens")
    public ResponseEntity<List<ItemPedidoResponseDTO>> findAll() {
        try {
            List<ItemPedidoResponseDTO> itens = itemPedidoService.findAll();
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buscar-item/{id}")
    public ResponseEntity<List<ItemPedidoResponseDTO>> findByChave(@PathVariable @NonNull Long id) {
        try {
            Pedido pedido = pedidoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

            List<ItemPedidoResponseDTO> itens = itemPedidoService.findById(pedido);
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
