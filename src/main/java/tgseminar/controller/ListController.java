package tgseminar.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;
import org.slim3.repackaged.org.json.JSONObject;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class ListController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		// TODO Auto-generated method stub
		
		// Get current user.
		User user
			= UserServiceFactory.getUserService().getCurrentUser();

		// Get entities from Memcache.
		List<Entity> entities
			= Memcache.get(user.getEmail());

		// Query entities from Datastore.
		if(entities == null){
			entities
				= Datastore.query("ToDo")
					.filter("createdBy", FilterOperator.EQUAL, user.getEmail())
					.sort("createdAt", SortDirection.DESCENDING)
					.asList();

			System.out.println("get list from Datastore.");
		}else{
			System.out.println("Get list from Memcache");
		}		
		// Convert to JSON.
		List<Map<String, Object>> entries = new ArrayList<Map<String, Object>>();
		
		for(Entity entity : entities){
			Map<String, Object> properties = new HashMap<String, Object>();

			properties.put("id",  entity.getKey().getId());
			properties.put("createdBy",  entity.getProperty("createdBy"));
			properties.put("createdAt",  entity.getProperty("createdAt"));
			properties.put("title",  entity.getProperty("title"));
 
			entries.add(properties);
		}

		String json = JSONObject.valueToString(entries);

		// Response to JSON.
		super.response.setContentType("application/json");
		super.response.setCharacterEncoding("utf-8");
		super.response.getWriter().println(json);
		super.response.flushBuffer();
		return null;
	}

}
