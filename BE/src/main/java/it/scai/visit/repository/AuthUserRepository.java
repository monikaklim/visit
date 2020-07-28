package it.scai.visit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.scai.visit.dto.AuthUserDto;
import it.scai.visit.dto.CompanyDto;

public interface AuthUserRepository extends JpaRepository<AuthUserDto, Long>{

	AuthUserDto getByUsername(String username);

}
