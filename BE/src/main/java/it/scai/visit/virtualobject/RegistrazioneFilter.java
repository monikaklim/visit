package it.scai.visit.virtualobject;

import java.sql.Timestamp;

public class RegistrazioneFilter {
	
	private String sede;

	private Long companyId;
	
	private Long userId;
	
	private Timestamp dateFrom;
	
	private Timestamp dateTo;

	public String getSede() {
		return sede;
	}

	public void setSede(String sede) {
		this.sede = sede;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Timestamp getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(Timestamp dateFrom) {
		this.dateFrom = dateFrom;
	}

	public Timestamp getDateTo() {
		return dateTo;
	}

	public void setDateTo(Timestamp dateTo) {
		this.dateTo = dateTo;
	}

	@Override
	public String toString() {
		return "RegistrazioneFilter [sede=" + sede + ", companyId=" + companyId + ", userId=" + userId + ", dateFrom="
				+ dateFrom + ", dateTo=" + dateTo + "]";
	}
	
	
}
