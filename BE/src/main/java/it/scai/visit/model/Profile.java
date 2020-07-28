package it.scai.visit.model;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Profile implements ResponseBean {
	
	@JsonProperty("username")
	private String username;
	
	@JsonProperty("password")
	private String password;

	@JsonProperty("role")
	private String role;


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
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	
}
