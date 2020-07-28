package it.scai.visit.dto;
import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name="companies")
public class CompanyDto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="company_ID", unique=true, nullable=false)
	private Long companyID;

	@Column(nullable=false, length=255)
	private String name;
	
	@Column(nullable=false, length=255)
	private String referent;
	
	@Column(nullable=false, length=255)
	private String city;
	
	@Column(nullable=false, length=255)
	private String address;
	
	public CompanyDto() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCompanyID() {
		return companyID;
	}

	public void setCompanyID(Long companyID) {
		this.companyID = companyID;
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