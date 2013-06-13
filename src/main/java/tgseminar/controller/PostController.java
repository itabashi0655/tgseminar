package tgseminar.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.memcache.Expiration;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class PostController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		// TODO Auto-generated method stub
		String title = super.request.getParameter("title");
		if(title == null || "".equals(title)){
			// return 400.
			super.response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// Get current user.
		User currentUser
			= UserServiceFactory.getUserService().getCurrentUser();
		String createdBy = currentUser.getEmail();

		// Get current date.
		Date createdAt = new Date();

		// create entity.
		Entity entity = new Entity("ToDo");
		entity.setProperty("title", title);
		entity.setProperty("createdAt", createdAt);
		entity.setProperty("createdBy", createdBy);
		
		// Put entity to Datastore.
		Datastore.put(entity);

		List<Entity> entities
			= Datastore.query("ToDo")
				.filter("createdBy", FilterOperator.EQUAL, currentUser.getEmail())
				.sort("createdAt", SortDirection.DESCENDING)
				.asList();

		// Put entities to Memcache.
		// Memcache expire 60sec.
		Memcache.put(entity.getProperty("createdBy"), entities, 
				Expiration.byDeltaSeconds(60));

		// Returns 201.
		super.response.setStatus(HttpServletResponse.SC_CREATED);	
		return null;
	}

}
