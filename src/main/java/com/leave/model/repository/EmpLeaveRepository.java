package com.leave.model.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.leave.model.entities.TEmpLeave;
import com.leave.model.entities.TEmployee;

public interface EmpLeaveRepository extends CrudRepository<TEmpLeave, Integer> {
	//List<TEmpLeave> findByTEmployee(int employeeId);

}
