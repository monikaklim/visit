package it.scai.visit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.scai.visit.dto.AuthUserDto;
import it.scai.visit.repository.AuthUserRepository;

@Service
public class DatabaseUserService {

	@Autowired 
	protected AuthUserRepository authUserRepository;
	
	public AuthUserDto getByUsername(String username) {
		AuthUserDto user = authUserRepository.getByUsername(username);
		return user;
	}
	
}
