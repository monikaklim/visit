package it.scai.visit.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.scai.visit.model.Company;
import it.scai.visit.model.Locations;
import it.scai.visit.model.User;
import it.scai.visit.service.CompanyService;

@RestController
public class CompanyController {
	protected static final Logger log = LoggerFactory.getLogger(CompanyController.class);
	
	@Autowired 
	protected CompanyService companyService;
	
	@RequestMapping(value = "/visit/company", method=RequestMethod.POST)
	public ResponseEntity<?> saveCompany(@RequestBody Company company) {		
		Long companyId = companyService.saveCompany(company);
		log.info("POST /visit/company --savecompany-- " + company.toString());	
		return new ResponseEntity<>(companyId, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/company/{companyId}", method=RequestMethod.PUT)
	public ResponseEntity<?> updatecompany(@PathVariable Long companyId, @RequestBody Company company) {		
		Long companyId_ = companyService.saveCompany(company);
		log.info("PUT /visit/company --updateCompany-- " + company.toString());	
		return new ResponseEntity<>(companyId_, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/companies", method=RequestMethod.GET)
	public ResponseEntity<?> findall() {		
		List<Company> company = companyService.findAll();
		log.info("GET /visit/company --findall-- ");	
		return new ResponseEntity<>(company, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/company/{companyId}", method=RequestMethod.GET)
	public ResponseEntity<?> findCompany(@PathVariable Long companyId) {		
		Company company = companyService.getCompanyByCompanyID(companyId);
		log.info("GET /visit/company --findCompany-- " + companyId);	
		return new ResponseEntity<>(company, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/findcompany", method=RequestMethod.POST)
	public ResponseEntity<?> findCompanyFiltered(@RequestBody Company companyFilter) {		
		Company company = companyService.getCompanyFiltered(companyFilter.getName(), companyFilter.getCity());
		log.info("GET /visit/company --findCompanyFiltered-- ");	
		return new ResponseEntity<>(company, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/companylocations", method=RequestMethod.GET)
	public ResponseEntity<?> findCompanyLocations() {		
		List<String> cities = companyService.findCompanyLocations();
		Locations locations = new Locations();
		locations.setLocation(cities);
		log.info("GET /visit/company --findCompanyLocations-- ");	
		return new ResponseEntity<>(locations, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/companiesfromlocation/{city}", method=RequestMethod.GET)
	public ResponseEntity<?> findCompanyFromLocations(@PathVariable String city) {		
		log.info("GET /visit/company --findCompanyFromLocations-- " + city);	
		List<Company> companies = companyService.findCompanyFromLocations(city);
		return new ResponseEntity<>(companies, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/domains", method=RequestMethod.GET)
	public ResponseEntity<?> findDomains() {		
		List<String> domains = companyService.findDomains();
		log.info("GET /visit/company --findDomains-- ");	
		return new ResponseEntity<>(domains, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/company/{companyId}", method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable Long companyId) {		
		Company company = companyService.deleteCompany(companyId);
		log.info("DELETE /visit/company --deleteUser-- " + companyId);	
		return new ResponseEntity<>(company, HttpStatus.OK);
	}
	
}
