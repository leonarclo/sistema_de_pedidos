package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.leonardo.spring_sistema_de_pedidos.dto.ArquivoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.storage.FileSystemStorageService;
import com.leonardo.spring_sistema_de_pedidos.storage.StorageFileNotFoundException;

@RestController
@RequestMapping("/api/v1")
public class UploadController {

    private final FileSystemStorageService storageService;
    private final ArquivoRepository arquivoRepository;
    private final PedidoRepository pedidoRepository;

    public UploadController(FileSystemStorageService storageService, ArquivoRepository arquivoRepository,
            PedidoRepository pedidoRepository) {
        this.storageService = storageService;
        this.arquivoRepository = arquivoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/files")
    public ResponseEntity<List<ArquivoDTO>> getListFiles() {
        List<ArquivoDTO> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            // String url = MvcUriComponentsBuilder
            // .fromMethodName(UploadController.class, "serveFile",
            // path.getFileName().toString()).build()
            // .toString();

            return new ArquivoDTO(filename);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/url/{filename:.+}")
    public ResponseEntity<String> getUrlFile(@PathVariable String filename) {
        Path fileUrl = storageService.load(filename);
        String url = MvcUriComponentsBuilder
                .fromMethodName(UploadController.class, "serveFile", fileUrl.getFileName().toString()).build()
                .toString();
        return ResponseEntity.status(HttpStatus.OK).body(url);

    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/files/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") List<MultipartFile> files,
            @RequestParam(name = "pedidoId", required = false) Long pedidoId) {
        List<String> fileNames = new ArrayList<>();

        if (pedidoId != null) {
            Pedido findPedido = pedidoRepository.findById(pedidoId)
                    .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));

            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                fileNames.add(fileName);
                storageService.store(file);
            }

            for (String arq : fileNames) {
                boolean arquivoExistente = arquivoRepository.existsByPedidoAndArquivo(findPedido, arq);
                if (!arquivoExistente) {
                    Arquivo arquivo = new Arquivo();
                    arquivo.setChave(findPedido.getChave());
                    arquivo.setArquivo(arq);
                    arquivo.setPedido(findPedido);
                    arquivoRepository.save(arquivo);
                }
            }
        } else {
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                fileNames.add(fileName);
                storageService.store(file);
            }
        }

        return ResponseEntity.ok().body("You successfully uploaded " + fileNames + "!");
    }

    @PostMapping("/files/delete/{filename:.+}")
    public ResponseEntity<String> delete(@PathVariable String filename) {
        try {
            boolean existed = storageService.delete(filename);
            if (existed) {
                Long deletedArquivo = arquivoRepository.deleteByArquivo(filename);

                if (deletedArquivo != null) {
                    return ResponseEntity.status(HttpStatus.OK).body("Excluído com sucesso!");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Falha ao excluir arquivo do banco de dados.");
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Este arquivo não existe!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Houve um erro interno ao tentar excluir");
        }
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
