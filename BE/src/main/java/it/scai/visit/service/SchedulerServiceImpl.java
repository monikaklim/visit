package it.scai.visit.service;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.scai.visit.service.UserService;
import it.scai.visit.virtualobject.RegistrationMax;
import it.scai.visit.service.SchedulerServiceImpl;

@Service("schedulerService")

@Transactional(readOnly=false)
public class SchedulerServiceImpl implements SchedulerService{

	private static final long serialVersionUID = 1L;

	@Value("${config.days}")
	private String days;

	@Autowired
	private UserService userService;

	@Autowired
	private RegistrationService registrationService;

	protected Logger logger = LoggerFactory.getLogger(SchedulerServiceImpl.class);
	
	@Override
	@Scheduled(cron="0 0 23 * * ?")	
	public void verifyUsersBatch() {
		logger.info("verifyUsersBatch");
		List<RegistrationMax> list = registrationService.findLastRegistration();
		
		for(RegistrationMax reg : list) {
			LocalDate currentDate = LocalDate.now();
		    Date d1 = Date.from(currentDate.minusDays(Long.valueOf(days).longValue()).atStartOfDay(ZoneId.systemDefault()).toInstant());
		    Date date = new Date(reg.getMaxRegistration().getTime());
		    if(date.before(d1)) {
		    	userService.deleteUserLogic(reg.getUserID());
		    	logger.info("delete User Logic "+ reg.getUserID());
		    }
		 }
	}

}
