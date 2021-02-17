package com.leave.model;

import java.text.SimpleDateFormat;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import com.leave.model.entities.Member;
import com.leave.model.entities.TEmpLeave;
import com.leave.model.entities.TEmployee;
import com.leave.model.entities.TLeaveType;
import com.leave.model.repository.*;


@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	public MemberRepository memberRepository;
	public EmployeeRepository empRepository;
	
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}
	

	@Bean
	public CommandLineRunner demo(final MemberRepository repository, final EmployeeRepository empRepository, final LeaveTypeRepository leaveTypeRepository, final EmpLeaveRepository empLeaveRepository) {
	    return new CommandLineRunner() {
			public void run(String... args) throws Exception {
				final TLeaveType tempLeaveType= new TLeaveType(1, "Illness Leave", "Leave for your health");
				final TEmployee tempEmp = new TEmployee(1, "neelam.mahapatro@sap.com", "neelam", "2020-06-13", "mahapatro", "8280030272", null);
				final TEmpLeave tempEmpLeave= new TEmpLeave(1, "2021-01-05", "Taking this leave due to Severe Headache", 2, "2021-01-04", tempEmp, tempLeaveType);
				
				if (repository.count() == 0) {
					log.info("Member Table is still empty. Adding some sample records to Members");
					repository.save(new Member(1, "Jack", "Bauer"));
					repository.save(new Member(2, "Chloe", "O'Brian"));
					repository.save(new Member(3, "Kim", "Bauer"));
					repository.save(new Member(4, "David", "Palmer"));
					repository.save(new Member(5, "Michelle", "Dessler"));					
					repository.save(new Member(5, "Michelle", "Dessler"));
				}
				if(leaveTypeRepository.count()==0)
				{
					log.info("Leave Type Table is still empty. Adding some sample records to");
					
					leaveTypeRepository.save(tempLeaveType);
					leaveTypeRepository.save(new TLeaveType(2, "Floating Leave", "Leave for regional celebration"));
					leaveTypeRepository.save(new TLeaveType(3, "Hospitalization Leave", "Leave for hospitalixation"));
					log.info("Adding data to Employee");
					empRepository.save(tempEmp);
					log.info("Adding data to Employee Leave Table");
					empLeaveRepository.save(tempEmpLeave);
				}
	        }
	    };
	}
	
	
	

}