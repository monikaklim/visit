package it.scai.visit.model;

import java.sql.Timestamp;

public class Registrazione extends RegistrazioneLight implements ResponseBean {
	
	private String firma;
	
	public String getFirma() {
		return firma;
	}

	public void setFirma(String firma) {
		this.firma = firma;
	}

}
