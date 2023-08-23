package com.poc.camunda8;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.dto.Pagination;
import io.camunda.tasklist.dto.TaskList;
import io.camunda.tasklist.dto.TaskSearch;
import io.camunda.tasklist.dto.TaskState;
import io.camunda.tasklist.exception.TaskListException;
import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;
import io.camunda.zeebe.client.api.worker.JobClient;

@RestController
@CrossOrigin
public class SampleController {

	public static List<Record> gridData = new ArrayList<Record>();
	@Autowired ZeebeClient client;
	CamundaTaskListClient taskClient; 
	io.camunda.tasklist.auth.AuthInterface saTaskList;
	public static String  clientId="*";
	public static String  clientSecret="*";
	public static String  taskListUrl="*";
		
		
	/*@PostConstruct
	public void createConnection() throws TaskListException {
		System.out.println("Inside post Construct");
		 saTaskList = new io.camunda.tasklist.auth.SaasAuthentication(clientId, clientSecret);
		    taskClient = new CamundaTaskListClient.Builder().taskListUrl(taskListUrl)
		            .authentication(saTaskList)
		            .build();
	}*/
	
	@GetMapping
	public String onBoard() {
		client.newActivateJobsCommand().jobType("test");
		return "Success";
	}
	
	@GetMapping(path="/list", produces= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Record>> getList() {
		return new ResponseEntity<>(gridData, HttpStatus.OK);
	}	
	
	@PostMapping(path="/create", produces= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Record>> create(@RequestBody Record rec) {
	    HashMap<String, Object> variables = new HashMap<String, Object>();	   
	    rec.setStatus("Initiated");
	    gridData.add(rec);
	    final ProcessInstanceEvent workflowInstanceEvent =
		    	client.newCreateInstanceCommand() //
		        .bpmnProcessId("test-process") //
		        .latestVersion() //
		        .variables(variables) //
		        .send().join();	    	   		    
	    //System.out.println(rec.toString());
	    return new ResponseEntity<>(gridData, HttpStatus.OK);	    
	  }
	
	
	@PostMapping(path="/userApproval", produces= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Record> userApproval(@RequestBody Record rec) throws Exception {
	    HashMap<String, Object> variables = new HashMap<String, Object>();
	    variables.put("status", rec.getStatus());	   
	    TaskSearch taskSearch = new TaskSearch();
	      taskSearch.setState(TaskState.CREATED);
	      taskSearch.setAssigned(Boolean.FALSE);
	      taskSearch.setWithVariables(true);
	      taskSearch.setPagination(new Pagination().setPageSize(20));

	      saTaskList = new io.camunda.tasklist.auth.SaasAuthentication(clientId, clientSecret);
		    taskClient = new CamundaTaskListClient.Builder().taskListUrl(taskListUrl)
		            .authentication(saTaskList)
		            .build();
		    
	      TaskList tasksList = taskClient.getTasks(taskSearch);
	     String str= tasksList.getItems().get(0).getId();
	     Map<String, Object> map = new HashMap<String, Object>();
	     map.put("status", "yes");
	     executeUserTask(str, map);
	    
		   /* System.out.println(workflowInstanceEvent.getBpmnProcessId());
		    System.out.println(workflowInstanceEvent.getProcessInstanceKey());
		    	    
		rec.setProcessInstanceId(workflowInstanceEvent.getProcessInstanceKey());		*/
		rec.setStatus(rec.status.equals("yes")? "Approved":"Rejected");
			
		for(int i=0;i<gridData.size();i++) {
			if(gridData.get(i).getName().equals(rec.getName()))
			{
				gridData.remove(i);
				gridData.add(rec);				
			}
		}
				
	    return new ResponseEntity<>(rec, HttpStatus.OK);	    
	  }

	
	  public void executeUserTask(String userTaskId, Map<String, Object> variables) throws Exception {
	     
	    try {
	      taskClient.claim(userTaskId, "Sonam");
	      taskClient.completeTask(userTaskId, variables);
	      System.out.println("test complete");
	    } catch (TaskListException e) {
	      throw new Exception("Can't execute task [" + userTaskId + "]");
	    }
	  }
}