package com.leonardo.spring_sistema_de_pedidos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    private final SecurityFilter securityFilter;
    private final CustomLogoutHandler customLogoutHandler;

    public SpringSecurityConfig(SecurityFilter securityFilter, CustomLogoutHandler customLogoutHandler) {
        this.securityFilter = securityFilter;
        this.customLogoutHandler = customLogoutHandler;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/v1/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/me").hasAuthority("1")
                        .requestMatchers(HttpMethod.POST, "/api/v1/registrar").hasAuthority("7")
                        .requestMatchers(HttpMethod.GET, "/api/v1/buscar-pedidos").hasAuthority("1")
                        .requestMatchers(HttpMethod.GET, "/api/v1/inserir-pedido").hasAuthority("1")
                        .requestMatchers(HttpMethod.GET, "/api/v1/editar-pedido").hasAuthority("7")
                        .requestMatchers(HttpMethod.GET, "/api/v1/buscar-item").hasAuthority("1")
                        .requestMatchers(HttpMethod.GET, "/api/v1/buscar-arquivos").hasAuthority("1")
                        .requestMatchers(HttpMethod.POST, "/api/v1/buscar-usuarios").hasAuthority("7")
                        .requestMatchers(HttpMethod.POST, "/api/v1/buscar-produtos").hasAuthority("7")
                        .requestMatchers(HttpMethod.POST, "/api/v1/editar-usuario").hasAuthority("7")
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/api/v1/logout")
                        .permitAll()
                        .logoutSuccessHandler(customLogoutHandler));
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
