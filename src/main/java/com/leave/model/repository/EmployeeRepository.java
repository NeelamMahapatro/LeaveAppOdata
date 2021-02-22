package com.leave.model.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.leave.model.entities.TEmployee;

public interface EmployeeRepository extends CrudRepository<TEmployee, Integer> {
	 List<TEmployee> findByEmailId(String emailId);

}