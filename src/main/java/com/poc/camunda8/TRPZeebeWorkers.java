package com.poc.camunda8;

import java.util.Map;

import org.springframework.stereotype.Component;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.ZeebeWorker;

@Component
public class TRPZeebeWorkers {

		@ZeebeWorker(type="send-email",autoComplete=true)
		public void emailTask() {
			System.out.print("Email is sent to the approver");
		}
		
		@ZeebeWorker(type="approve",autoComplete=true)
		public void approveTask() {
			System.out.print("Plan is approved");
		}
		
		@ZeebeWorker(type="reject",autoComplete=true)
		public void rejectTask() {
			System.out.print("Plan is rejected");
		}
		
		/*@ZeebeWorker(type="io.camunda.zeebe:userTask")
		public void handleJob(final JobClient client, final ActivatedJob job) {
			System.out.println(job.getElementId());
			Map variables= job.getVariablesAsMap();			
			System.out.println("job key "+ job.getKey());
			client.newCompleteCommand(job.getKey())
			.variables(Map.of("newVariable", "VariableFromClient"))
			.send()
			.join();
		}*/
		

}