package it.scai.visit.controller;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.ArrayList;
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

import it.scai.visit.model.Registrazione;
import it.scai.visit.model.RegistrazioneResponse;
import it.scai.visit.repository.RegistrationBatchRepository;
import it.scai.visit.repository.RegistrationRepository;
import it.scai.visit.service.RegistrationService;
import it.scai.visit.virtualobject.PdfVO;
import it.scai.visit.virtualobject.RegistrationMax;
import it.scai.visit.virtualobject.RegistrazioneFilter;

@RestController
public class RegistrationController {

	protected static final Logger log = LoggerFactory.getLogger(RegistrationController.class);
	
	@Autowired 
	protected RegistrationService registrationService;

	@Autowired 
	protected RegistrationRepository registrationRepository;
	
	@RequestMapping(value = "/visit/registration", method=RequestMethod.POST)
	public ResponseEntity<?> saveRegistration(@RequestBody Registrazione registration) {		
		Long registrationId = registrationService.saveRegistration(registration);
		return new ResponseEntity<>(registrationId, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registration/{registrationId}", method=RequestMethod.PUT)
	public ResponseEntity<?> updateRegistration(@PathVariable Long registrationId, @RequestBody Registrazione registration) {		
		Long registrationId_ = registrationService.saveRegistration(registration);
		return new ResponseEntity<>(registrationId_, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registrations", method=RequestMethod.GET)
	public ResponseEntity<?> findall() {		
		RegistrazioneResponse registration = registrationService.findAll();
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registrationsfiltered", method=RequestMethod.POST)
	public ResponseEntity<?> findRegistrationsFiltered(@RequestBody RegistrazioneFilter filter) {		
		RegistrazioneResponse registration = registrationService.findRegistrationsFiltered(filter);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registrationsfilteredpdf", method=RequestMethod.POST)
	public ResponseEntity<?> findRegistrationsFilteredPdf(@RequestBody RegistrazioneFilter filter) {		
		RegistrazioneResponse registration = registrationService.findRegistrationsFilteredPdf(filter);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registrationstoday/{venue}", method=RequestMethod.GET)
	public ResponseEntity<?> findRegistrationsToday(@PathVariable String venue) {		
		RegistrazioneResponse registration = registrationService.findRegistrationsToday(venue);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/registration/{registrationId}", method=RequestMethod.GET)
	public ResponseEntity<?> findRegistration(@PathVariable Long registrationId) {		
		Registrazione registration = registrationService.getRegistration(registrationId);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/savepdf", method=RequestMethod.POST)
	public ResponseEntity<?> savePdf(@RequestBody PdfVO pdfVO) {		
		String esito = registrationService.savePdf(pdfVO);
		return new ResponseEntity<>(esito, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/findlastregistration", method=RequestMethod.GET)
	public ResponseEntity<?> findLastRegistration() {
		List<RegistrationMax> list = registrationService.findLastRegistration();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/visit/countdistinctperdayenabled", method=RequestMethod.POST)
	public ResponseEntity<?> findCountDistinctDayEnabled(@RequestBody RegistrazioneFilter filter) {		
		int[] registration = registrationService.findCountDistinctDayEnabled(filter);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	@RequestMapping(value = "/visit/countdistinctperday", method=RequestMethod.POST)
	public ResponseEntity<?> findCountDistinctDay(@RequestBody RegistrazioneFilter filter) {		
		int[] registration = registrationService.findCountDistinctDay(filter);
		return new ResponseEntity<>(registration, HttpStatus.OK);
	}
	
	
}
