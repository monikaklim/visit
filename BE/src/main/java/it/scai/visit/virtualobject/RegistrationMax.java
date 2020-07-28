package it.scai.visit.virtualobject;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class RegistrationMax {
	
	@Id
	private Long userID;
	
	private Timestamp maxRegistration;

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}

	public Timestamp getMaxRegistration() {
		return maxRegistration;
	}

	public void setMaxRegistration(Timestamp maxRegistration) {
		this.maxRegistration = maxRegistration;
	}
	
} 
