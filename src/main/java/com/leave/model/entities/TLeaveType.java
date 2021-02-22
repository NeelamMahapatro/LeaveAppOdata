package com.leave.model.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the t_leave_type database table.
 * 
 */
@Entity
@Table(name="t_leave_type")
@NamedQuery(name="TLeaveType.findAll", query="SELECT t FROM TLeaveType t")
public class TLeaveType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="leave_desc")
	private String leaveDesc;

	@Column(name="leave_type")
	private String leaveType;

	//bi-directional many-to-one association to TEmpLeave
	@OneToMany(mappedBy="TLeaveType")
	private List<TEmpLeave> TEmpLeaves;
	
	

	public TLeaveType(int id, String leaveDesc, String leaveType) {
		super();
		this.id = id;
		this.leaveDesc = leaveDesc;
		this.leaveType = leaveType;
	}

	public TLeaveType() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLeaveDesc() {
		return this.leaveDesc;
	}

	public void setLeaveDesc(String leaveDesc) {
		this.leaveDesc = leaveDesc;
	}

	public String getLeaveType() {
		return this.leaveType;
	}

	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	public List<TEmpLeave> getTEmpLeaves() {
		return this.TEmpLeaves;
	}

	public void setTEmpLeaves(List<TEmpLeave> TEmpLeaves) {
		this.TEmpLeaves = TEmpLeaves;
	}

	public TEmpLeave addTEmpLeave(TEmpLeave TEmpLeave) {
		getTEmpLeaves().add(TEmpLeave);
		TEmpLeave.setTLeaveType(this);

		return TEmpLeave;
	}

	public TEmpLeave removeTEmpLeave(TEmpLeave TEmpLeave) {
		getTEmpLeaves().remove(TEmpLeave);
		TEmpLeave.setTLeaveType(null);

		return TEmpLeave;
	}

}