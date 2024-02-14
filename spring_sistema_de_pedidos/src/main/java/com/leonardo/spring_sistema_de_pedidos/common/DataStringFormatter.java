package com.leonardo.spring_sistema_de_pedidos.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Service;

@Service
public class DataStringFormatter {

    public final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public String formatCurrentDateTime() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return currentDateTime.format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
    }
}
