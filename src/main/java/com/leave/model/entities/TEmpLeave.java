package com.leave.model.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the t_emp_leave database table.
 * 
 */
@Entity
@Table(name="t_emp_leave")
@NamedQuery(name="TEmpLeave.findAll", query="SELECT t FROM TEmpLeave t")
public class TEmpLeave implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="end_date")
	private String endDate;

	private String note;

	@Column(name="quota_used")
	private int quotaUsed;

	@Column(name="start_date")
	private String startDate;

	//bi-directional many-to-one association to TEmployee
	@ManyToOne
	@JoinColumn(name="emp_id")
	private TEmployee TEmployee;

	//bi-directional many-to-one association to TLeaveType
	@ManyToOne
	@JoinColumn(name="leave_id")
	private TLeaveType TLeaveType;

	public TEmpLeave() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEndDate() {
		return this.endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public int getQuotaUsed() {
		return this.quotaUsed;
	}

	public void setQuotaUsed(int quotaUsed) {
		this.quotaUsed = quotaUsed;
	}

	public String getStartDate() {
		return this.startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public TEmployee getTEmployee() {
		return this.TEmployee;
	}

	public void setTEmployee(TEmployee TEmployee) {
		this.TEmployee = TEmployee;
	}

	public TLeaveType getTLeaveType() {
		return this.TLeaveType;
	}

	public void setTLeaveType(TLeaveType TLeaveType) {
		this.TLeaveType = TLeaveType;
	}

	public TEmpLeave(int id, String endDate, String note, int quotaUsed, String startDate,
			com.leave.model.entities.TEmployee tEmployee, com.leave.model.entities.TLeaveType tLeaveType) {
		super();
		this.id = id;
		this.endDate = endDate;
		this.note = note;
		this.quotaUsed = quotaUsed;
		this.startDate = startDate;
		TEmployee = tEmployee;
		TLeaveType = tLeaveType;
	}

	

}