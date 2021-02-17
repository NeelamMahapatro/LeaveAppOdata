package com.leave.model.entities;

import java.io.Serializable;
import javax.persistence.*;

import com.leave.model.utils.SAPLineItem;
import com.leave.model.utils.Sap;


/**
 * The persistent class for the members database table.
 * 
 */
@Entity
@Table(name="members")
public class Member {

	@Id
	private int id;
	@SAPLineItem
	@Column(name="first_name")
    private String firstName;
	
	@Sap(filterable=true, sortable=true)
	@SAPLineItem
	@Column(name="last_name")
    private String lastName;

    public Member() {}

    public Member(int id, String firstName, String lastName) {
    	this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "Member[id=%d, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
}
