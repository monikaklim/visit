package it.scai.visit.dto;


import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.sql.Timestamp;

@Entity
@Table(name="registrations")
public class RegistrazioneDto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="registration_ID", unique=true, nullable=false)
	private Long registrationID;

	@Column(nullable=false)
	private Timestamp time;
	
	@Column(nullable=false)
	private int type;

	@Column(nullable=false)
	private boolean enabled;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_ID", nullable=false)
	private UserDto user;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="company_ID", nullable=false)
	private CompanyDto company;
	
	@Column
	@Lob
	private byte[] firma;
	
	@Column
	private Long externalRef;
	
	public RegistrazioneDto() {
	}

	public Long getRegistrationID() {
		return this.registrationID;
	}

	public void setRegistrationID(Long registrationID) {
		this.registrationID = registrationID;
	}

	public UserDto getUser() {
		return this.user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public CompanyDto getCompany() {
		return company;
	}

	public void setCompany(CompanyDto company) {
		this.company = company;
	}
	
	public byte[] getFirma() {
		return firma;
	}

	public void setFirma(byte[] firma) {
		this.firma = firma;
	}

	public Long getExternalRef() {
		return externalRef;
	}

	public void setExternalRef(Long externalRef) {
		this.externalRef = externalRef;
	}

}
