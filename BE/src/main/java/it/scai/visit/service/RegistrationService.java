package it.scai.visit.service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import it.scai.visit.util.DateUtil;
import it.scai.visit.virtualobject.PdfVO;
import it.scai.visit.virtualobject.RegistrationMax;
import it.scai.visit.virtualobject.RegistrazioneFilter;
import it.scai.visit.dto.CompanyDto;
import it.scai.visit.dto.RegistrazioneDto;
import it.scai.visit.dto.UserDto;
import it.scai.visit.model.Company;
import it.scai.visit.model.Registrazione;
import it.scai.visit.model.RegistrazioneLight;
import it.scai.visit.model.RegistrazioneList;
import it.scai.visit.model.RegistrazioneResponse;
import it.scai.visit.repository.CompanyRepository;
import it.scai.visit.repository.RegistrationRepository;
import it.scai.visit.repository.UserRepository;

import java.io.*;
import java.math.BigInteger;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


@Service
public class RegistrationService {

	@Autowired 
	protected RegistrationRepository registrationRepository;
	
	@Autowired
	protected UserRepository userRepository;
	
	@Autowired
	protected CompanyRepository companyRepository;
	
	@Value("${config.urlFile}")
	private String urlFile;
	
	public Long saveRegistration(Registrazione registration) {
		if(registration.getRegistrazioneId()!=null && registration.getRegistrazioneId()!= 0) {
			Optional<RegistrazioneDto> optionalRegistrationDto = registrationRepository.findById(registration.getRegistrazioneId());
			RegistrazioneDto registrazioneDto = new RegistrazioneDto();
			try {
				registrazioneDto = optionalRegistrationDto.get();
			}catch(NoSuchElementException  e) {
				//TODO
			}
			registration.setFirma(convertRegistrationDto(registrazioneDto).getFirma());
		}
		RegistrazioneDto registrationDto = convertRegistration(registration);
		RegistrazioneDto saved = registrationRepository.save(registrationDto);
		return saved.getRegistrationID();
	}
	
	public Registrazione updateRegistration(Registrazione registration) {
		RegistrazioneDto registrationDto = convertRegistration(registration);
		RegistrazioneDto saved = registrationRepository.save(registrationDto);
		Registrazione reg = convertRegistrationDto(saved);
		return reg;
	}

	public Registrazione getRegistration(Long registrationId) {
		Optional<RegistrazioneDto> optionalRegistrationDto = registrationRepository.findById(registrationId);
		RegistrazioneDto registrazioneDto = new RegistrazioneDto();
		try {
			registrazioneDto = optionalRegistrationDto.get();
		}catch(NoSuchElementException  e) {
			//TODO
		}
		Registrazione registration = convertRegistrationDto(registrazioneDto);
		return registration;
	}

	public RegistrazioneResponse findAll() {
//	public List<List<Registrazione>> findAll() {	
		List<RegistrazioneDto> registrations = registrationRepository.findAll();
		List<Registrazione> list=new  ArrayList<Registrazione>();
		for (RegistrazioneDto elem : registrations) {
			list.add(convertRegistrationDto(elem));
		}
		List<List<Registrazione>> splittedList = new ArrayList<List<Registrazione>>();
		if(list.size()>0) {
			splittedList = split(list);
		}

		RegistrazioneResponse response = new RegistrazioneResponse();
		if (splittedList.size() > 10) {
			List<List<Registrazione>> tail = splittedList.subList(splittedList.size() - 10, splittedList.size());
			response.setStart(splittedList.size() - 10);
			response.setTotal(splittedList.size());
			response.setFromDate(tail.get(0).get(0).getTime());
			response.setToDate(tail.get(tail.size()-1).get(0).getTime());
			response.setRegistrazioneDaily(tail);
		}else {
			response.setStart(0);
			response.setTotal(splittedList.size());
			response.setFromDate(splittedList.get(0).get(0).getTime());
			response.setToDate(splittedList.get(splittedList.size()-1).get(0).getTime());
			response.setRegistrazioneDaily(splittedList);
		}
		
		response.setToday(false);
		
//		return splittedList;
		return response;
	}

	public RegistrazioneResponse findRegistrationsToday(String sede) {
//	public List<List<Registrazione>> findRegistrationsToday(String sede) {	
		java.util.Date dayStart = DateUtil.getStartOfDay(new Date(System.currentTimeMillis()));
		java.util.Date dayEnd = DateUtil.getEndOfDay(new Date(System.currentTimeMillis()));
		List<RegistrazioneDto> registrations = registrationRepository.findEnabledByDateAndVenue(dayStart,dayEnd, sede);
		List<Registrazione> list=new  ArrayList<Registrazione>();
		for (RegistrazioneDto elem : registrations) {
			list.add(convertRegistrationDto(elem));
		}
		List<List<Registrazione>> splittedList = new ArrayList<List<Registrazione>>();
		if(list.size()>0) {
			splittedList = split(list);
		}
		
		RegistrazioneResponse response = new RegistrazioneResponse();
		
		if(splittedList.size() > 0) {
			response.setTotal(1);
			response.setFromDate(splittedList.get(0).get(0).getTime());
			response.setToDate(splittedList.get(splittedList.size()-1).get(0).getTime());
		} else {
			response.setTotal(0);
			response.setFromDate(new Timestamp(System.currentTimeMillis()));
			response.setToDate(new Timestamp(System.currentTimeMillis()));
		}
		
		response.setStart(0);
		response.setToday(true);
		response.setRegistrazioneDaily(splittedList);
		
		return response;
//		return splittedList;
	}
	
	public RegistrazioneResponse findRegistrationsFiltered(RegistrazioneFilter filter) {
		return splitRegistrationsFiltered(convertRegistrationsFiltered(findRegistrationsFilteredAbstract(filter)));
	}
	
	public RegistrazioneResponse findRegistrationsFilteredPdf(RegistrazioneFilter filter) {
		return splitRegistrationsFiltered(convertRegistrationsFiltered(findRegistrationsFilteredAbstract(filter)));
	}

	public List<RegistrazioneDto> findRegistrationsFilteredAbstract(RegistrazioneFilter filter) {
				
		List<RegistrazioneDto> registrations = new ArrayList<RegistrazioneDto>();
		if(filter.getUserId() != null) {
			registrations = registrationRepository.findByUserId(filter.getUserId());
		}else if(filter.getSede() != null) {
			if(filter.getCompanyId() != null) {
				if( filter.getDateFrom() != null && filter.getDateTo() != null ) {
					registrations = registrationRepository.findByCompanyAndDate(filter.getCompanyId(), filter.getDateFrom(), filter.getDateTo());
				} else {
					registrations = registrationRepository.findByCompanyId(filter.getCompanyId());
				}
			} else {
				if( filter.getDateFrom() != null && filter.getDateTo() != null ) {
					java.util.Date dayStart = DateUtil.getStartOfDay(filter.getDateFrom());
					java.util.Date dayEnd = DateUtil.getEndOfDay(filter.getDateTo());
					registrations = registrationRepository.findBySedeAndDate(filter.getSede(), dayStart, dayEnd);
				} else {
					registrations = registrationRepository.findBySede(filter.getSede());
				}
			}
		} else {
			if( filter.getDateFrom() != null && filter.getDateTo() != null ) {
				java.util.Date dayStart = DateUtil.getStartOfDay(filter.getDateFrom());
				java.util.Date dayEnd = DateUtil.getEndOfDay(filter.getDateTo());
				registrations = registrationRepository.findByDate(dayStart,  dayEnd);
			} else {
				registrations = registrationRepository.findAll();
			}
		}
		return registrations;
	}
	
	public List<Registrazione> convertRegistrationsFiltered(List<RegistrazioneDto> registrations) {
		
		List<Registrazione> list=new  ArrayList<Registrazione>();
		RegistrazioneList registrationList = new RegistrazioneList();
		for (RegistrazioneDto elem : registrations) {
			list.add(convertRegistrationDto(elem));
		}
		registrationList.setRegistrazioneList(list);
		return list;
	}
	
public List<Registrazione> convertRegistrationsLightFiltered(List<RegistrazioneDto> registrations) {
		
		List<Registrazione> list=new  ArrayList<Registrazione>();
		for (RegistrazioneDto elem : registrations) {
			list.add((Registrazione) convertRegistrationDtoLight(elem));
		}
		return list;
	}
	
	public RegistrazioneResponse splitRegistrationsFiltered(List<Registrazione> list) {
		RegistrazioneResponse response = new RegistrazioneResponse();
		List<List<Registrazione>> splittedList = new ArrayList<List<Registrazione>>();
		if(list.size()>0) {
			splittedList = split(list);
		}
		if (splittedList.size()>0) {
			if (splittedList.size() > 10) {
				List<List<Registrazione>> tail = splittedList.subList(Math.max(splittedList.size() - 10, 0), splittedList.size());
				response.setStart(splittedList.size() - 10);
				response.setTotal(splittedList.size());
				response.setFromDate(tail.get(0).get(0).getTime());
				response.setToDate(tail.get(tail.size()-1).get(0).getTime());
				response.setRegistrazioneDaily(tail);
			} else {
				response.setStart(0);
				response.setTotal(splittedList.size());
				response.setFromDate(splittedList.get(0).get(0).getTime());
				response.setToDate(splittedList.get(splittedList.size()-1).get(0).getTime());
				response.setRegistrazioneDaily(splittedList);
			}
		} else {
			response.setStart(0);
			response.setTotal(0);
			response.setFromDate(null);
			response.setToDate(null);
			response.setRegistrazioneDaily(splittedList);
		}

		response.setToday(false);
		
		return response;
	}
	
	public Registrazione convertRegistrationDto(RegistrazioneDto registrationDto) {
		Registrazione registration = (Registrazione) convertRegistrationDtoLight(registrationDto);
		registration.setFirma(registrationDto.getFirma() != null ? new String(registrationDto.getFirma()) : null);
		return registration;
	}
	public RegistrazioneLight convertRegistrationDtoLight(RegistrazioneDto registrationDto) {
		RegistrazioneLight registration = new Registrazione();
		registration.setRegistrazioneId(registrationDto.getRegistrationID());
		registration.setCompanyId(registrationDto.getCompany().getCompanyID());
		registration.setTime(registrationDto.getTime());
		registration.setType(registrationDto.getType());
		registration.setEnabled(registrationDto.isEnabled());
		registration.setUserId(registrationDto.getUser().getUserID());
		registration.setUserFirstName(registrationDto.getUser().getFirstname());
		registration.setUserLastName(registrationDto.getUser().getLastname());
		registration.setCompany(registrationDto.getCompany().getName());
//		registration.setCompany((registrationDto.getUser().getCompany() != null) ? registrationDto.getUser().getCompany() : " ");
		registration.setExternalRef(registrationDto.getExternalRef());
		return registration;
	}
	
	public RegistrazioneDto convertRegistration(Registrazione registration) {
		RegistrazioneDto registrationDto = new RegistrazioneDto();
		registrationDto.setRegistrationID(registration.getRegistrazioneId());
		registrationDto.setTime(registration.getTime());
		registrationDto.setType(registration.getType());
		registrationDto.setEnabled(registration.isEnabled());
		registrationDto.setCompany(companyRepository.findById(registration.getCompanyId()).get());
		registrationDto.setUser(userRepository.findById(registration.getUserId()).get());
		registrationDto.setExternalRef(registration.getExternalRef());
		registrationDto.setFirma(registration.getFirma().getBytes());
		System.out.println(registration.getFirma().getBytes());
		return registrationDto;
	}
	
	 public List<List<Registrazione>> split(List<Registrazione> value) {
	        List<List<Registrazione>> result = new ArrayList<>();

	        java.util.Date dayStart = DateUtil.getStartOfDay(value.iterator().next().getTime());
			java.util.Date dayEnd = DateUtil.getEndOfDay(value.iterator().next().getTime());
			
//	        Date day = value.iterator().next().getTime();
	        List<Registrazione> newListEntry = new ArrayList<>();

	        for (Registrazione reg : value) {
	            if (reg.getTime().after(dayStart) && reg.getTime().before(dayEnd)) {
	                newListEntry.add(reg);
	            }
	            else {
	            	dayStart = DateUtil.getStartOfDay(reg.getTime());
	            	dayEnd = DateUtil.getEndOfDay(reg.getTime());
	                result.add(newListEntry);
	                newListEntry = new ArrayList<>();
	                newListEntry.add(reg);
	            }
	        }
	        result.add(newListEntry);//because the last sublist was not added

	        return result;
	    }
	 
	public String savePdf(PdfVO pdfVO) {
		Optional<UserDto> user = userRepository.findById(pdfVO.getUserId());
        try {
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] decodedBytes;
            FileOutputStream fop;
            decodedBytes = decoder.decodeBuffer(pdfVO.getBase64());
            File file = new File(urlFile+user.get().getFirstname()+"-"+user.get().getLastname()+"-informativa.pdf");
            fop = new FileOutputStream(file);

            fop.write(decodedBytes);
            fop.flush();
            fop.close();
//            System.out.println("Created");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		return null;
	}
	
	
	public List<RegistrationMax> findLastRegistration() {
		List<RegistrationMax> list = new ArrayList<RegistrationMax>();
		List<Object[]> esito = registrationRepository.findLastRegistration();
		for(Object[] c : esito) {
			RegistrationMax reg = new RegistrationMax();
			reg.setUserID(((BigInteger) c[0]).longValue());
			reg.setMaxRegistration((Timestamp) c[1]);
		     list.add(reg);
		 }
		return list;
	}
	
	public int[] findCountDistinctDayEnabled(RegistrazioneFilter filter) {
		int[] data =  {0,0};
		int ingressi = registrationRepository.findCountDistinctDayEnabled(1, DateUtil.getStartOfDay(filter.getDateFrom()), DateUtil.getEndOfDay(filter.getDateTo()));
		int uscite = registrationRepository.findCountDistinctDayEnabled(2, DateUtil.getStartOfDay(filter.getDateFrom()), DateUtil.getEndOfDay(filter.getDateTo()));
		data[0] = ingressi;
		data[1] = uscite;
		return data;
	}

	public int[] findCountDistinctDay(RegistrazioneFilter filter) {
		int[] data =  {0,0};
		int ingressi = registrationRepository.findCountDistinctDay(1, DateUtil.getStartOfDay(filter.getDateFrom()), DateUtil.getEndOfDay(filter.getDateTo()));
		int uscite = registrationRepository.findCountDistinctDay(2, DateUtil.getStartOfDay(filter.getDateFrom()), DateUtil.getEndOfDay(filter.getDateTo()));
		data[0] = ingressi;
		data[1] = uscite;
		return data;		
	}

}
