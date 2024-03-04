package com.leonardo.spring_sistema_de_pedidos.controllers;

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
import com.leonardo.spring_sistema_de_pedidos.dto.ArquivoDTO;
import com.leonardo.spring_sistema_de_pedidos.storage.FileSystemStorageService;
import com.leonardo.spring_sistema_de_pedidos.storage.StorageFileNotFoundException;

@RestController
@RequestMapping("/api/v1")
public class UploadController {

    private final FileSystemStorageService storageService;

    public UploadController(FileSystemStorageService storageService) {
        this.storageService = storageService;

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
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") List<MultipartFile> files) {
        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : files) {
            fileNames.add(file.getOriginalFilename());
            // Arquivo arquivo = new Arquivo();
            // arquivo.setArquivo(file.getOriginalFilename());
            // arquivoRepository.save(arquivo);
            storageService.store(file);
        }
        return ResponseEntity.ok().body("You successfully uploaded " + fileNames + "!");
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }

}
