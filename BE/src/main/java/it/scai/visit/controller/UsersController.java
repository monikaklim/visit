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

import it.scai.visit.model.User;
import it.scai.visit.repository.UserRepository;
import it.scai.visit.service.UserService;
import it.scai.visit.virtualobject.UserFilter;

@RestController
public class UsersController {
	protected static final Logger log = LoggerFactory.getLogger(UsersController.class);
	
	@Autowired 
	protected UserRepository userRepository;
	
	@Autowired 
	protected UserService userService;
	
	@RequestMapping(value = "/visit/user", method=RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody User user) {		
		Long userId = userService.saveUser(user);
		log.info("POST /visit/user --saveUser-- " + user.toString());	
		return new ResponseEntity<>(userId, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/user/{userId}", method=RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User user) {		
		Long userId_ = userService.saveUser(user);
		log.info("PUT /visit/user --updateUser-- " + user.toString());	
		return new ResponseEntity<>(userId_, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/users", method=RequestMethod.GET)
	public ResponseEntity<?> findall() {		
		List<User> user = userService.findAll();
		log.info("GET /visit/user --findall-- ");	
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/usersenabled", method=RequestMethod.GET)
	public ResponseEntity<?> findUserEnabled() {		
		List<User> user = userService.findUserEnabled();
		log.info("GET /visit/user --usersenabled-- ");	
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/usersfiltered", method=RequestMethod.POST)
	public ResponseEntity<?> findUserFiltered(@RequestBody UserFilter filter) {		
		List<User> user = userService.findUserFiltered(filter);
		log.info("GET /visit/user --findUserFiltered-- "+ filter.toString());	
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/user/{userId}", method=RequestMethod.GET)
	public ResponseEntity<?> findUser(@PathVariable Long userId) {		
		User user = userService.getUser(userId);
		log.info("GET /visit/user --findUser-- " + userId);	
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/user/{userId}", method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable Long userId) {		
		User user = userService.deleteUserLogic(userId);
		log.info("DELETE /visit/user --deleteUser-- " + userId);	
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
