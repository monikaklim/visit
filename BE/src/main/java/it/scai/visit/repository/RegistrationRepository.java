package it.scai.visit.repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.scai.visit.dto.RegistrazioneDto;
import it.scai.visit.virtualobject.RegistrationMax;

import org.springframework.data.repository.query.Param;
@Repository
public interface RegistrationRepository extends JpaRepository<RegistrazioneDto, Long>{

	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.time > :dayStart AND r.time < :dayEnd")	
	List<RegistrazioneDto> findByDate(
			@Param("dayStart") java.util.Date dayStart, 
			@Param("dayEnd") java.util.Date dayEnd);
	
	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.time > :dayStart AND r.time < :dayEnd AND enabled = true")	
	List<RegistrazioneDto> findByDateAndEnabled(
			@Param("dayStart") java.util.Date dayStart, 
			@Param("dayEnd") java.util.Date dayEnd);
	
	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.time > :dayStart AND r.time < :dayEnd AND enabled = true and r.company.city =:sede ORDER BY r.time")	
	List<RegistrazioneDto> findEnabledByDateAndVenue(
			@Param("dayStart") java.util.Date dayStart, 
			@Param("dayEnd") java.util.Date dayEnd,
			@Param("sede") String sede);
	
	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.user.userID =:userId ORDER BY r.time")
	List<RegistrazioneDto> findByUserId(
			@Param("userId") Long userId);

	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.time > :dayStart AND r.time < :dayEnd AND r.company.companyID =:companyId ORDER BY r.time")
	List<RegistrazioneDto> findByCompanyAndDate(
			@Param("companyId") Long companyId, 
			@Param("dayStart") java.util.Date dateFrom, 
			@Param("dayEnd") java.util.Date dateTo);
	
	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.time > :dayStart AND r.time < :dayEnd AND r.company.city =:sede ORDER BY r.time")
	List<RegistrazioneDto> findBySedeAndDate(
			@Param("sede") String sede, 
			@Param("dayStart") java.util.Date dateFrom, 
			@Param("dayEnd") java.util.Date dateTo);
	
	@Query("SELECT r FROM RegistrazioneDto r WHERE r.company.companyID =:companyId ORDER BY r.time")
	List<RegistrazioneDto> findByCompanyId(
			@Param("companyId") Long companyId);
	
	@Query("SELECT r FROM RegistrazioneDto r  WHERE r.company.city =:sede ORDER BY r.time")
	List<RegistrazioneDto> findBySede(
			@Param("sede") String sede);
	
	@Query(value = "SELECT u.user_ID, r.maxregistration AS registrationMax FROM users u JOIN( SELECT r.user_ID, MAX(r.time) AS maxregistration FROM registrations r GROUP BY r.user_ID HAVING MAX(r.time) )r ON u.user_ID = r.user_id WHERE u.enabled = 1;", nativeQuery = true)
	List<Object[]> findLastRegistration();
	
	@Query(value = "SELECT COUNT(DISTINCT u.user_ID) FROM users u JOIN( SELECT r.user_ID FROM registrations r WHERE r.type =:type AND r.time > :dayStart AND r.time < :dayEnd)r ON u.user_ID = r.user_id WHERE u.enabled = 1;", nativeQuery = true)
	int findCountDistinctDayEnabled(
			@Param("type") int type,
			@Param("dayStart") java.util.Date dateFrom, 
			@Param("dayEnd") java.util.Date dateTo);
	
	@Query(value = "SELECT COUNT(DISTINCT u.user_ID) FROM users u JOIN( SELECT r.user_ID FROM registrations r WHERE r.type =:type AND r.time > :dayStart AND r.time < :dayEnd)r ON u.user_ID = r.user_id", nativeQuery = true)
	int findCountDistinctDay(
			@Param("type") int type,
			@Param("dayStart") java.util.Date dateFrom, 
			@Param("dayEnd") java.util.Date dateTo);

}
