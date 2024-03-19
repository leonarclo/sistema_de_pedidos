package com.leonardo.spring_sistema_de_pedidos.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Service;

@Service
public class Formatters {

    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final String CHAVE_FORMAT = "yyyyMMddHHmmss";

    public static String currentDateTime() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return currentDateTime.format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
    }

    public static String generateChave() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return currentDateTime.format(DateTimeFormatter.ofPattern(CHAVE_FORMAT));
    }
}
