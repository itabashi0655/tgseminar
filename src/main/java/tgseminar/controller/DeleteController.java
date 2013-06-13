package tgseminar.controller;

import java.util.List;
import javax.servlet.http.HttpServletResponse;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.memcache.Expiration;

public class DeleteController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		// TODO Auto-generated method stub
		String idString = super.request.getParameter("id");

		// Returns 400: "id" parameter is not specified
		if(idString == null || "".equals(idString)){
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		int id;

		// Returns 400: "id" parameter is not numeric value
		try{
			id = Integer.parseInt(idString);
		}catch(NumberFormatException ex){
			super.response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// Create delete key.
		Key deleteKey = Datastore.createKey("ToDo", id);

		// Get delete entity
		Entity entity
			= Datastore.get(deleteKey);

		// Delete entity by key.
		Datastore.delete(deleteKey);

		List<Entity> entities
			= Datastore.query("ToDo")
				.filter("createdBy", FilterOperator.EQUAL, entity.getProperty("createdBy"))
				.sort("createdAt", SortDirection.DESCENDING)
				.asList();

		// Put entities to Memcache.
		// Memcache expire 60sec.
		Memcache.put(entity.getProperty("createdBy"), entities, 
				Expiration.byDeltaSeconds(60));

		// Returns 200: completes to delete correctly
		super.response.setStatus(HttpServletResponse.SC_CREATED);
		return null;
	}

}
