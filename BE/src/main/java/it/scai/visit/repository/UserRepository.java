package it.scai.visit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.scai.visit.dto.CompanyDto;
import it.scai.visit.dto.UserDto;

@Repository
public interface UserRepository extends JpaRepository<UserDto, Long>{

	@Query("SELECT u FROM UserDto u WHERE u.enabled = true ORDER BY u.firstname,u.lastname")
	List<UserDto>findUserEnabled();

	@Query("SELECT u FROM UserDto u WHERE u.firstname =:name AND u.lastname =:surname AND u.company=:company AND u.enabled = true")
	List<UserDto> findByUserAndCompany(
			@Param("name") String name, 
			@Param("surname") String surname, 
			@Param("company") String company);

	@Query("SELECT u FROM UserDto u WHERE u.firstname =:name AND u.lastname =:surname AND u.enabled = true")
	List<UserDto> findByUser(
			@Param("name") String name, 
			@Param("surname") String surname);

	@Query("SELECT u FROM UserDto u WHERE u.firstname =:name AND u.company=:company AND u.enabled = true")
	List<UserDto> findByNameAndCompany(
			@Param("name") String name, 
			@Param("company") String company);

	@Query("SELECT u FROM UserDto u WHERE u.firstname =:name AND u.enabled = true")
	List<UserDto> findByName(
			@Param("name") String name);

	@Query("SELECT u FROM UserDto u WHERE u.lastname =:surname AND u.company =:company AND u.enabled = true")
	List<UserDto> findBySurnameAndCompany(
			@Param("surname") String surname, 
			@Param("company") String company);

	@Query("SELECT u FROM UserDto u WHERE u.lastname =:surname AND u.enabled = true")
	List<UserDto> findBySurname(
			@Param("surname") String surname);

	@Query("SELECT u FROM UserDto u WHERE u.company =:company AND u.enabled = true")
	List<UserDto> findByCompany(
			@Param("company") String company);

}
