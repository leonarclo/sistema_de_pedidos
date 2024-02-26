package com.leonardo.spring_sistema_de_pedidos.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("orders-system")
                    .withSubject(usuario.getUsuario())
                    .withClaim("id", usuario.getId())
                    .withClaim("nomeCompleto", usuario.getNomeCompleto())
                    .withClaim("email", usuario.getEmail())
                    .withClaim("departamento", usuario.getDepartamento())
                    .withClaim("nivel", usuario.getNivel())
                    .withExpiresAt(genExpirateDate(42))
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token:", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("orders-system")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException e) {
            throw new RuntimeException("Erro ao verificar token:", e);
        }
    }

    private Instant genExpirateDate(Integer horas) {
        return LocalDateTime.now().plusHours(horas).toInstant(ZoneOffset.of("-03:00"));
    }
}
