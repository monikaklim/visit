package it.scai.visit.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import it.scai.visit.model.ApplicationToken;
import it.scai.visit.model.ErrorResponse;
import it.scai.visit.model.Profile;

public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {
	
	protected static final Logger log = LoggerFactory.getLogger(JwtLoginFilter.class);
	
	public JwtLoginFilter(String url, AuthenticationManager authManager) {
		super(new AntPathRequestMatcher(url));
		setAuthenticationManager(authManager);
	}

	@Override
	  public Authentication attemptAuthentication(
	      HttpServletRequest req, HttpServletResponse res)
	      throws AuthenticationException, IOException, ServletException {
		if (CorsUtils.isPreFlightRequest(req)) {
            res.setStatus(HttpServletResponse.SC_OK);
            return null;
        }
		if (!req.getMethod().equals(HttpMethod.POST.name())) {
            res.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
		if("POST".equals(req.getMethod())) {
			Profile creds = new ObjectMapper()
				.readValue(req.getInputStream(), Profile.class);
			return getAuthenticationManager().authenticate(
				new UsernamePasswordAuthenticationToken(
					creds.getUsername(),
					creds.getPassword(),
					Collections.emptyList()
				)
			);
		}
		return null;
	  }
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
	        Authentication authResult) throws IOException, ServletException {
	    TokenAuthenticationService
	    .addAuthentication(response, authResult.getName());
	    ApplicationToken token = TokenAuthenticationService.getApplicationToken(authResult.getName());
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsonRespString = ow.writeValueAsString(token);
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().write(jsonRespString);
		response.getWriter().flush();
		response.getWriter().close();
	}

	  @Override
	  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			  AuthenticationException failed) throws IOException, ServletException {
//		  response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
//				  "Authentication Failed");
		  	ErrorResponse error = new ErrorResponse();
		  	error.setCode("401");
		  	error.setMessage("UNAUTHORIZED");
		  	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			String jsonRespString = ow.writeValueAsString(error);
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(jsonRespString);
			response.getWriter().flush();
			response.getWriter().close();
		  
	  }
}
