package com.example.demo.security.jwt;

import com.example.demo.security.services.UserDetailsImpl;
import com.example.demo.user.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${bezkoder.app.jwtSecret}")
	private String jwtSecret;

	@Value("${bezkoder.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	@Value("${bezkoder.app.jwtRefreshCookieName}")
	private String jwtRefreshCookieName;

	public String getJwtRefreshFromCookies(HttpServletRequest request) {
		return getCookieValueByName(request, jwtRefreshCookieName);
	}

	private String getCookieValueByName(HttpServletRequest request, String name) {
		Cookie cookie = WebUtils.getCookie(request, name);
		if (cookie != null) {
			return cookie.getValue();
		} else {
			return null;
		}
	}

	public ResponseCookie generateRefreshJwtCookie(String refreshToken) {
		return generateCookie(jwtRefreshCookieName, refreshToken, "/api/v1/auth/refresh");
	}

	private ResponseCookie generateCookie(String name, String value, String path) {
		return ResponseCookie.from(name, value).path(path).maxAge(24 * 60 * 60).httpOnly(true).build();
	}

	public ResponseCookie getCleanJwtRefreshCookie() {
		return ResponseCookie.from(jwtRefreshCookieName, null).path("/api/v1/auth/refresh").build();
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parserBuilder().setSigningKey(key()).build()
				.parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
			return true;
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		return false;
	}

	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	public String generateAccessToken(Authentication authentication) {

		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
//		todo: změnit na HS512?
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(key(), SignatureAlgorithm.HS256)
				.compact();
	}

	public String generateAccessToken(User user) {

//		todo: změnit na HS512?
		return Jwts.builder()
				.setSubject((user.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(key(), SignatureAlgorithm.HS256)
				.compact();
	}
}
