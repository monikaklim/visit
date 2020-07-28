package it.scai.visit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.scai.visit.dto.CompanyDto;

public interface CompanyRepository extends JpaRepository<CompanyDto, Long>{

	@Query("SELECT DISTINCT c.city FROM CompanyDto c")	
	List<String> findLocations();
	

	@Query("SELECT c FROM CompanyDto c WHERE c.city = :city")
	List<CompanyDto>findByLocation(
			@Param("city") String city);

	@Query("SELECT c FROM CompanyDto c WHERE c.name = :name AND c.city = :city")
	List<CompanyDto> findFiltered(
			@Param("name") String name, 
			@Param("city") String city);

}
