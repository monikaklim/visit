package it.scai.visit.model;

import java.sql.Timestamp;

public class RegistrazioneLight implements ResponseBean {
	
	private Long registrazioneId;
	
	private Long userId;

	private String userFirstName;
	
	private String userLastName;
	
	private String company;
	
	private Long companyId;
	
	private Timestamp time;
	
	private int type;
	
	private boolean enabled;
	
	private Long externalRef;

	public Long getRegistrazioneId() {
		return registrazioneId;
	}

	public void setRegistrazioneId(Long registrazioneId) {
		this.registrazioneId = registrazioneId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
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

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Long getExternalRef() {
		return externalRef;
	}

	public void setExternalRef(Long externalRef) {
		this.externalRef = externalRef;
	}
	
}
