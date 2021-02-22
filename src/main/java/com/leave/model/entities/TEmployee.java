package com.leave.model.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the t_employee database table.
 * 
 */
@Entity
@Table(name="t_employee")
@NamedQuery(name="TEmployee.findAll", query="SELECT t FROM TEmployee t")
public class TEmployee implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="employee_id")
	private int employeeId;

	@Column(name="email_id")
	private String emailId;

	@Column(name="first_name")
	private String firstName;

	@Column(name="joining_date")
	private String joiningDate;

	@Column(name="last_name")
	private String lastName;

	@Column(name="phone_number")
	private String phoneNumber;

	//bi-directional many-to-one association to TEmpLeave
	@OneToMany(mappedBy="TEmployee")
	private List<TEmpLeave> TEmpLeaves;

	public TEmployee() {
	}

	public int getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmailId() {
		return this.emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getJoiningDate() {
		return this.joiningDate;
	}

	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public List<TEmpLeave> getTEmpLeaves() {
		return this.TEmpLeaves;
	}

	public void setTEmpLeaves(List<TEmpLeave> TEmpLeaves) {
		this.TEmpLeaves = TEmpLeaves;
	}

	public TEmpLeave addTEmpLeave(TEmpLeave TEmpLeave) {
		getTEmpLeaves().add(TEmpLeave);
		TEmpLeave.setTEmployee(this);

		return TEmpLeave;
	}

	public TEmpLeave removeTEmpLeave(TEmpLeave TEmpLeave) {
		getTEmpLeaves().remove(TEmpLeave);
		TEmpLeave.setTEmployee(null);

		return TEmpLeave;
	}

	public TEmployee(int employeeId, String emailId, String firstName, String joiningDate, String lastName,
			String phoneNumber, List<TEmpLeave> tEmpLeaves) {
		super();
		this.employeeId = employeeId;
		this.emailId = emailId;
		this.firstName = firstName;
		this.joiningDate = joiningDate;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		TEmpLeaves = tEmpLeaves;
	}

}