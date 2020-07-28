package it.scai.visit.model;

import java.util.List;

public class RegistrazioneList implements ResponseBean {

	private List<Registrazione> registrazioneList;

	public List<Registrazione> getRegistrazioneList() {
		return registrazioneList;
	}

	public void setRegistrazioneList(List<Registrazione> registrazioneList) {
		this.registrazioneList = registrazioneList;
	} 
}
