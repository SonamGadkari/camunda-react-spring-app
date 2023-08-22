package com.poc.camunda8;

public class Record {
	
	public long processInstanceId;
	public String name;
	public String description;
	public String status;	
	
	public Record(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getProcessInstanceId() {
		return processInstanceId;
	}
	public void setProcessInstanceId(long processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "TrpRecord [processInstanceId=" + processInstanceId + ", name=" + name + ", description=" + description
				+ ", status=" + status + "]";
	}	
			
	
}
