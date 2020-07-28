package it.scai.visit.dto;


import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="users")
	public class UserDto implements Serializable {
		private static final long serialVersionUID = 1L;

		@Id
		@GeneratedValue(strategy=GenerationType.AUTO)
		@Column(name="user_ID", unique=true, nullable=false)
		private Long userID;
		
		@Column(name="enabled", nullable=false)
		private boolean enabled;

		@Column(length=64)
		private String company;
		
		@Column(length=64)
		private String phone;
		
		@Column(length=64)
		private String mobile;	
		
		@Column(length=64)
		private String email;
		
		@Column(nullable=false, length=64)
		private String firstname;

		@Column(nullable=false, length=64)
		private String lastname;

		@Column(nullable=false, length=128)
		private String address;
		
		@Column(nullable=false, length=64)
		private String occupation;

		@JsonManagedReference
		@OneToMany(fetch = FetchType.EAGER, mappedBy="user")
		@Fetch(FetchMode.JOIN)
		private Set<RegistrazioneDto> registrations;
		
		
		public UserDto() {
		}

		public Long getUserID() {
			return this.userID;
		}

		public void setUserID(Long userID) {
			this.userID = userID;
		}

		public String getCompany() {
			return this.company;
		}

		public void setCompany(String company) {
			this.company = company;
		}

		public String getEmail() {
			return this.email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getFirstname() {
			return this.firstname;
		}

		public void setFirstname(String firstname) {
			this.firstname = firstname;
		}

		public String getPhone() {
			return phone;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public String getLastname() {
			return this.lastname;
		}

		public void setLastname(String lastname) {
			this.lastname = lastname;
		}

		public Set<RegistrazioneDto> getRegistrations() {
			return this.registrations;
		}

		public void setRegistrations(Set<RegistrazioneDto> registrations) {
			this.registrations = registrations;
		}
		
		public boolean getEnabled() {
			return this.enabled;
		}

		public void setEnabled(boolean enabled) {
			this.enabled = enabled;
		}

		public String getAddress() {
			return address;
		}

		public String getOccupation() {
			return occupation;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public void setOccupation(String occupation) {
			this.occupation = occupation;
		}

//		public String getUuid() {
//			return uuid;
//		}
//
//		public void setUuid(String uuid) {
//			this.uuid = uuid;
//		}
}
