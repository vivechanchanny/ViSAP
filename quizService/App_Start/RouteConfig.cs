using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace quizService
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
				 
             routes.MapRoute(
                name: "sync2",
                url: "{controller}/sync"
            );			
 
			routes.MapRoute(
                name: "update",
                url: "{controller}/book/{id}/{action}"
            );	
            
         
        }
    }
}
