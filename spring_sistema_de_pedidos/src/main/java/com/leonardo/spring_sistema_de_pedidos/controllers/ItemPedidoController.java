package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.services.ItemPedidoService;

@RestController
@RequestMapping("/api/v1")
public class ItemPedidoController {

    public final ItemPedidoService itemPedidoService;

    ItemPedidoController(ItemPedidoService itemPedidoService) {
        this.itemPedidoService = itemPedidoService;
    }

    @GetMapping("/buscar-itens")
    public ResponseEntity<List<ItemPedidoDTO>> findAll() {
        try {
            List<ItemPedidoDTO> itens = itemPedidoService.findAll();
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buscar-item")
    public ResponseEntity<List<ItemPedidoDTO>> findByChave(@RequestParam(name = "chave") String chave) {
        try {
            List<ItemPedidoDTO> itens = itemPedidoService.findByChave(chave);
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/inserir-item")
    public ResponseEntity<ItemPedidoDTO> save(@RequestBody ItemPedidoDTO itemPedido) {
        try {
            ItemPedidoDTO novoItemPedido = itemPedidoService.save(itemPedido);
            return ResponseEntity.ok(novoItemPedido);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/editar-item")
    public ResponseEntity<ItemPedidoDTO> update(@RequestBody ItemPedidoDTO itemPedido) {
        try {
            ItemPedidoDTO novoItem = itemPedidoService.update(itemPedido);
            return ResponseEntity.ok(novoItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
