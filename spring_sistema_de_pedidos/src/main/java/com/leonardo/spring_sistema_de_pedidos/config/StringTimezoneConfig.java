package com.leonardo.spring_sistema_de_pedidos.config;

import java.util.TimeZone;

import org.springframework.context.annotation.Configuration;

@Configuration
public class StringTimezoneConfig {
    
    public void timezoneConfig() {
        TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
    }
}
