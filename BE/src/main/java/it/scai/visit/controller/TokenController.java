package it.scai.visit.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.scai.visit.model.Profile;

@RestController
public class TokenController {

	protected static final Logger log = LoggerFactory.getLogger(TokenController.class);

	@RequestMapping(value = "/visit/signin", method=RequestMethod.POST)
	public ResponseEntity<?> getToken(@RequestBody Profile profile) {		
		log.info("POST /visit/signin --signin-- " + profile.toString());	
		return new ResponseEntity<>(profile, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/verifytoken", method=RequestMethod.GET)
	public ResponseEntity<?> verifyToken() {		
		log.info("GET /visit/token --verifytoken-- ");	
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
