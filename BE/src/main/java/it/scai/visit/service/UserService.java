package it.scai.visit.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.scai.visit.dto.UserDto;
import it.scai.visit.model.User;
import it.scai.visit.repository.UserRepository;
import it.scai.visit.virtualobject.UserFilter;

@Service
public class UserService {
	
	@Autowired 
	protected UserRepository userRepository;

	public Long saveUser(User user) {
		UserDto userDto = convertUser(user);
		userDto.setEnabled(true);
		UserDto saved = userRepository.save(userDto);
		return saved.getUserID();
	}

	public User getUser(Long userId) {
		Optional<UserDto> optionalUser = userRepository.findById(userId);
		UserDto userDto = new UserDto();
		try {
			userDto = optionalUser.get();
		}catch(NoSuchElementException e ) {
			//TODO
		}finally {
			
		}
		User user = convertUserDto(userDto);
		return user;
	}

	public List<User> findAll() {
		List<UserDto> users = userRepository.findAll();
		List<User> list=new  ArrayList<User>();
		for (UserDto elem : users) {
			list.add(convertUserDto(elem));
		}
		return list;
	}
	
	public User deleteUser(Long userId) {
		Optional<UserDto> optionalUser = userRepository.findById(userId);
		UserDto user = new UserDto();
		try {
			user = optionalUser.get();
		}finally {
			userRepository.delete(user);
		}
		return null;
	}
	
	public User deleteUserLogic(Long userId) {
		Optional<UserDto> optionalUser = userRepository.findById(userId);
		UserDto userdto = new UserDto();
		try {
			userdto = optionalUser.get();
		}catch(NoSuchElementException e ) {
			//TODO
		}
		userdto.setFirstname("");
		userdto.setLastname("");
		userdto.setAddress("");
		userdto.setEmail("");
		userdto.setMobile("");
		userdto.setPhone("");
		userdto.setEnabled(false);
		UserDto userdtoUpdate = userRepository.saveAndFlush(userdto);
		return convertUserDto(userdtoUpdate);
	}
	
	public List<User> findUserFiltered(UserFilter filter) {
		List<UserDto> users = new ArrayList<UserDto>();
		if(filter.getFirstname() != null) {
			if(filter.getLastname() != null) {
				if(filter.getCompany() != null) {
					users = userRepository.findByUserAndCompany(filter.getFirstname(), filter.getLastname(), filter.getCompany());
				}else {
					users = userRepository.findByUser(filter.getFirstname(), filter.getLastname());
				}
			}else{
				if(filter.getCompany() != null) {
					users = userRepository.findByNameAndCompany(filter.getFirstname(), filter.getCompany());
				}else {
					users = userRepository.findByName(filter.getFirstname());
				}
			}
		}else {
			if(filter.getLastname() != null) {
				if(filter.getCompany() != null) {
					users = userRepository.findBySurnameAndCompany(filter.getLastname(), filter.getCompany());
				}else {
					users = userRepository.findBySurname(filter.getLastname());
				}
			}else {
				users = userRepository.findByCompany(filter.getCompany());
			}
		}
		List<User> list=new  ArrayList<User>();
		for (UserDto elem : users) {
			list.add(convertUserDto(elem));
		}
		return list;
	}
	
	public List<User> findUserEnabled() {
		List<UserDto> users = userRepository.findUserEnabled();
		List<User> list=new  ArrayList<User>();
		for (UserDto elem : users) {
			list.add(convertUserDto(elem));
		}
		return list;
	}

	public User convertUserDto(UserDto userDto) {
		User user = new User();
		user.setUserId(userDto.getUserID());
		user.setFirstname(userDto.getFirstname());
		user.setLastname(userDto.getLastname());
		user.setEmail(userDto.getEmail());
		user.setMobile(userDto.getMobile());
		user.setPhone(userDto.getPhone());
		user.setCompany(userDto.getCompany());
		user.setAddress(userDto.getAddress());
		user.setOccupation(userDto.getOccupation());
		return user;
	}
	
	public UserDto convertUser(User user) {
		UserDto userDto = new UserDto();
		userDto.setUserID(user.getUserId());
		userDto.setFirstname(user.getFirstname());
		userDto.setLastname(user.getLastname());
		userDto.setEmail(user.getEmail());
		userDto.setMobile(user.getMobile());
		userDto.setPhone(user.getPhone());
		userDto.setCompany(user.getCompany());
		userDto.setAddress(user.getAddress());
		userDto.setOccupation(user.getOccupation());
		return userDto;
	}
}
