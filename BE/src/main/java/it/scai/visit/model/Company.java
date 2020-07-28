package it.scai.visit.model;

public class Company implements ResponseBean {

	private Long companyId;
	
	private String name;
	
	private String referent;
	
	private String city;
	
	private String address;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	
	public String getReferent() {
		return referent;
	}

	public void setReferent(String referent) {
		this.referent = referent;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}
