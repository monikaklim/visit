package it.scai.visit.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import it.scai.visit.dto.CompanyDto;
import it.scai.visit.dto.UserDto;
import it.scai.visit.model.Company;
import it.scai.visit.model.User;
import it.scai.visit.repository.CompanyRepository;

@Service
public class CompanyService {
	
	@Value("${config.domains}")
	private String domains;
	
	@Autowired 
	protected CompanyRepository companyRepository;
	
	public Long saveCompany(Company company) {
		CompanyDto companyDto = convertCompany(company);
		CompanyDto saved = companyRepository.save(companyDto);
		return saved.getCompanyID();
	}

	public List<Company> findAll() {
		List<CompanyDto> companies = companyRepository.findAll();
		List<Company> list=new  ArrayList<Company>();
		for (CompanyDto elem : companies) {
			list.add(convertCompanyDto(elem));
		}
		return list;
	}

	public Company getCompanyByCompanyID(Long companyId) {
		Optional<CompanyDto> optionalCompanyDto = companyRepository.findById(companyId);
		CompanyDto companyDto = new CompanyDto();
		try {
			companyDto = optionalCompanyDto.get();
		}catch(NoSuchElementException  e) {
			//TODO
		}
		Company company = convertCompanyDto(companyDto);
		return company;
	}
	
	
	public List<String> findDomains(){
		List<String> listDom = Arrays.asList(domains.split("\\s*,\\s*"));
		return listDom;
	}

	public List<String> findCompanyLocations() {
		List<String> cities = companyRepository.findLocations();
		return cities;
	}

	public List<Company> findCompanyFromLocations(String city) {
		List<CompanyDto> companies = companyRepository.findByLocation(city);
		List<Company> list=new  ArrayList<Company>();
		for (CompanyDto elem : companies) {
			list.add(convertCompanyDto(elem));
		}
		return list;
	}


	public Company getCompanyFiltered(String name, String city) {
		List<CompanyDto> companies = companyRepository.findFiltered(name, city);
		List<Company> list=new  ArrayList<Company>();
		for (CompanyDto elem : companies) {
			list.add(convertCompanyDto(elem));
		}
		if(list.size()>0) {
			return list.get(0);
		}else {
			return null;
		}
	}
	
	public Company convertCompanyDto(CompanyDto companyDto) {
		Company company = new Company();
		company.setCompanyId(companyDto.getCompanyID());
		company.setName(companyDto.getName());
		company.setAddress(companyDto.getAddress());
		company.setCity(companyDto.getCity());
		company.setReferent(companyDto.getReferent());
		return company;
	}
	
	public CompanyDto convertCompany(Company company) {
		CompanyDto companyDto = new CompanyDto();
		companyDto.setCompanyID(company.getCompanyId());
		companyDto.setName(company.getName());
		companyDto.setAddress(company.getAddress());
		companyDto.setCity(company.getCity());
		companyDto.setReferent(company.getReferent());
		return companyDto;
	}

	
	public Company deleteCompany(Long companyId) {
		Optional<CompanyDto> optionalCompany = companyRepository.findById(companyId);
		CompanyDto company = new CompanyDto();
		try {
			company = optionalCompany.get();
		}finally {
			companyRepository.delete(company);
		}
		return null;
	}
	
}
