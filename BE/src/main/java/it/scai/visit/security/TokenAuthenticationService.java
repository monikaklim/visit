package it.scai.visit.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import it.scai.visit.model.ApplicationToken;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security
            .authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import static java.util.Collections.emptyList;

import java.io.IOException;

public class TokenAuthenticationService {
	  static final long EXPIRATIONTIME = 86400000; // 1 day
	  static final String SECRET = "ThisIsASecret";
	  static final String TOKEN_PREFIX = "Bearer";
	  static final String HEADER_STRING = "Authorization";
	  static final String HEADER_EXPIRES = "Expires";
	  
	  
	static void addAuthentication(HttpServletResponse res, String username) throws IOException {
	    String JWT = getToken(username);
	    String expires = String.valueOf(System.currentTimeMillis() + EXPIRATIONTIME);
	    res.addHeader(HEADER_STRING, JWT);
	    res.addHeader(HEADER_EXPIRES,  expires);
	  }
	
	static String getToken(String username) {
		String JWT = Jwts.builder()
		        .setSubject(username)
		        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
		        .signWith(SignatureAlgorithm.HS512, SECRET)
		        .compact();
		return JWT;
	}
	
	static ApplicationToken getApplicationToken(String username) {
		ApplicationToken token = new ApplicationToken();
		token.setToken(getToken(username));
		token.setExpires(System.currentTimeMillis() + EXPIRATIONTIME);
		return token;
	}

	  static Authentication getAuthentication(HttpServletRequest request) {
	    String token = request.getHeader(HEADER_STRING);
	    if (token != null) {
	      // parse the token.
	    	try {
	    		String user = Jwts.parser()
	    				.setSigningKey(SECRET)
	    				.parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
	    				.getBody()
	    				.getSubject();
	    		
	  	      return user != null ?
	  		          new UsernamePasswordAuthenticationToken(user, null, emptyList()) :
	  		          null;
	    	}catch( Exception e) {
//	    		throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
	    		return null;
	    	}
	    }
	    return null;
	  }
}
