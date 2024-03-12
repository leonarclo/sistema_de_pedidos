package com.leonardo.spring_sistema_de_pedidos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.leonardo.spring_sistema_de_pedidos.storage.FileSystemStorageService;
import com.leonardo.spring_sistema_de_pedidos.storage.StorageProperties;

@SpringBootApplication
@EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@EnableConfigurationProperties(StorageProperties.class)
public class SpringSistemaDePedidosApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringSistemaDePedidosApplication.class, args);
	}

	@Bean
	CommandLineRunner init(FileSystemStorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
