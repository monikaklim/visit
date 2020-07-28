package it.scai.visit.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.lang.Assert;
import it.scai.visit.dto.AuthUserDto;
import it.scai.visit.model.UserContext;
import it.scai.visit.service.DatabaseUserService;

@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {  
	    private final BCryptPasswordEncoder encoder;
	    private final DatabaseUserService userService;

	    @Autowired
	    public JWTAuthenticationProvider(final DatabaseUserService userService, final BCryptPasswordEncoder encoder) {
	        this.userService = userService;
	        this.encoder = encoder;
	    }

	    @Override
	    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
	        Assert.notNull(authentication, "No authentication data provided");

	        String username = (String) authentication.getPrincipal();
	        String password = (String) authentication.getCredentials();

	        AuthUserDto user = userService.getByUsername(username);//.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
	        if (user!=null) {
		        if (!encoder.matches(password, user.getPassword())) {
		            throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
		        }
	        }else {
	        	throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
	        }
	
		        if (user.getRole() == null) throw new InsufficientAuthenticationException("User has no roles assigned");
	
		        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ANOTHER");
		        authorities.add(authority);
	
		        UserContext userContext = UserContext.create(user.getUsername(), authorities);
	        return new UsernamePasswordAuthenticationToken(user.getUsername(), null, userContext.getAuthorities());
	    }

	    @Override
	    public boolean supports(Class<?> authentication) {
	        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	    }
	}