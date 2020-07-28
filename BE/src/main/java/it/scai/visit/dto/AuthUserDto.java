package it.scai.visit.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="authusers")
public class AuthUserDto {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="authusers_ID", unique=true, nullable=false)
	private Long authusersID;

	@Column(nullable=false, length=255)
	private String username;
	
	@Column(nullable=false, length=255)
	private String password;
	
	@Column(nullable=false, length=255)
	private String role;

	public Long getAuthusersID() {
		return authusersID;
	}

	public void setAuthusersID(Long authusersID) {
		this.authusersID = authusersID;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
}
