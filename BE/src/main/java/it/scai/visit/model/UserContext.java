package it.scai.visit.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

public class UserContext {
	
	private String username;
	private String password;
	private Collection< ? extends GrantedAuthority> authorities;

	public static UserContext create(String username, List<GrantedAuthority> authorities) {
		UserContext user = new UserContext();
		user.setUsername(username);
		user.setAuthorities(authorities);
		return user;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

}
