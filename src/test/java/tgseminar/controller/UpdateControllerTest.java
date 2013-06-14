package tgseminar.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;

import org.junit.Before;
import org.junit.Test;
import org.slim3.datastore.Datastore;
import org.slim3.tester.ControllerTestCase;
import org.slim3.tester.TestEnvironment;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.apphosting.api.ApiProxy;
import com.google.apphosting.api.ApiProxy.Environment;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

public class UpdateControllerTest extends ControllerTestCase {
	
	@Override
	public void setUp() throws Exception {
		// TODO Auto-generated method stub
		super.setUp();

		TestEnvironment env = (TestEnvironment)ApiProxy.getCurrentEnvironment();
		env.setEmail("loginuser@example.com");
		
		// create test data.
		Entity entity1 = new Entity(Datastore.createKey("ToDo", 1));
		entity1.setProperty("title", "ToDo1");
		entity1.setProperty("createdBy", "loginuser@example.com");
		entity1.setProperty("createdAt", new Date());

		Entity entity2 = new Entity(Datastore.createKey("ToDo", 2));
		entity2.setProperty("title", "ToDo2");
		entity2.setProperty("createdBy", "anotheruser@example.com");
		entity2.setProperty("createdAt", new Date());
		
		System.out.println("save");
		Datastore.put(entity1, entity2);		
	}

	@Test
	public void respond400IfIdNotSpecified()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("case 1");

		tester.param("title", "To-Do #1");
		tester.start("/Update");
		
		//TODO: assert response from server is 400
		assertThat(tester.response.getStatus(),is(400));
		
		// kindÇÃåèêîÇéÊìæÇ∑ÇÈ
		//tester.count(kindName)
	}
	
	@Test
	public void respond400IfIdIsNotNumeric()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("case 2");

		tester.param("id", "aaaaa");
		tester.param("title", "To-Do #1");
		tester.start("/Update");
		
		//TODO: assert response from server is 400
		assertThat(tester.response.getStatus(),is(400));
	}
	
	@Test
	public void respond400IfTitleIsNotSpecified()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("case 3");

		tester.param("id", "100");
		tester.start("/Update");
		
		//TODO: assert response from server is 400
		assertThat(tester.response.getStatus(),is(400));
	}
	
	@Test
	public void respond404IfEntityIsNotFound()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("case 4");

		tester.param("id", "3");
		tester.param("title", "To-Do #2");
		tester.start("/Update");
		
		//TODO: assert response from server is 404
		assertThat(tester.response.getStatus(),is(404));
	}
	
	@Test
	public void respond403IfAnotherUser()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		
		System.out.println("case 5  count:" + tester.count("ToDo"));

		tester.param("id", "2");
		tester.param("title", "To-Do #2");
		tester.start("/Update");
		
		//TODO: assert response from server is 403
		assertThat(tester.response.getStatus(),is(403));
	}

	@Test
	public void respond200Update()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{
		
		System.out.println("test 6");
		
		String modifiedTitle = "To-Do #1 Update";
		
		tester.param("id", "1");
		tester.param("title", modifiedTitle);
		tester.start("/Update");
	
		Key key = Datastore.createKey("ToDo", 1);
		Entity entity = Datastore.get(key);
		
		assertThat(entity.getProperty("title").equals(modifiedTitle), is(true));
	}
	
	@Test
	public void respond200Success()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{
		
		System.out.println("test 7");
		
		String modifiedTitle = "To-Do #1 Update";
		
		tester.param("id", "1");
		tester.param("title", modifiedTitle);
		tester.start("/Update");
		
		//TODO: assert response from server is 200
		assertThat(tester.response.getStatus(),is(200));
	}
}
