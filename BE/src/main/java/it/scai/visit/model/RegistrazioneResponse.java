package it.scai.visit.model;

import java.sql.Timestamp;
import java.util.List;

public class RegistrazioneResponse implements ResponseBean {
	
//	private List<RegistrazioneList> registrazioneDaily;
	
	private List<List<Registrazione>> registrazioneDaily;
	
	private boolean today;
	
	private Timestamp fromDate;
	
	private Timestamp toDate;
	
	private int total;
	
	private int start;
	


	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public Timestamp getFromDate() {
		return fromDate;
	}

	public void setFromDate(Timestamp fromDate) {
		this.fromDate = fromDate;
	}

	public Timestamp getToDate() {
		return toDate;
	}

	public void setToDate(Timestamp toDate) {
		this.toDate = toDate;
	}

	public List<List<Registrazione>> getRegistrazioneDaily() {
		return registrazioneDaily;
	}

	public void setRegistrazioneDaily(List<List<Registrazione>> registrazioneDaily) {
		this.registrazioneDaily = registrazioneDaily;
	}

	public boolean isToday() {
		return today;
	}

	public void setToday(boolean today) {
		this.today = today;
	}

	
}
