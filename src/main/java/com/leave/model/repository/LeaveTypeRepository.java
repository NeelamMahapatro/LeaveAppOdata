package com.leave.model.repository;

import org.springframework.data.repository.CrudRepository;
import com.leave.model.entities.TLeaveType;

public interface LeaveTypeRepository extends CrudRepository<TLeaveType, Integer> {

}