package it.scai.visit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import it.scai.visit.virtualobject.RegistrationMax;

@Repository("RegistrationBatchRepository")
public interface RegistrationBatchRepository extends JpaRepository<RegistrationMax, Long>{

	@Query(value = "SELECT u.user_ID, r.maxregistration AS registrationMax FROM users u JOIN( SELECT r.user_ID, MAX(r.time) AS maxregistration FROM registrations r GROUP BY r.user_ID HAVING MAX(r.time) )r ON u.user_ID = r.user_id WHERE u.enabled = 1;", nativeQuery = true)
	List<RegistrationMax> findLastRegistration();
	
//	Query q = em.createNativeQuery("SELECT a.id, a.version, a.firstname, a.lastname FROM Author a", Author.class);
//	List<Author> authors = q.getResultList();

	/*
	select u.user_ID, r.maxregistration 
	as userslist
	from users u 
	join(
		select r.user_ID, max(r.time) 
		as maxregistration
	    from registrations r 
	    group by r.user_ID 
	    having max(r.time)
	)r on  u.user_ID = r.user_id
	where u.enabled = 1;
	*/
}
