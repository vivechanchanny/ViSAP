using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace quizService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
			      name: "DefaultApi",
			      routeTemplate: "{controller}/sync/{id}",
			      defaults: new { id = RouteParameter.Optional  }
			  );
            
            config.Routes.MapHttpRoute(
			      name: "questupdate",
			      routeTemplate: "{controller}/video/{videoid}/question/{questionid}",
			      defaults: new { id = RouteParameter.Optional  }
			  );
            
              config.Routes.MapHttpRoute(
			      name: "Asset",
			      routeTemplate: "{controller}/{questionid}",
			      defaults: new { id = RouteParameter.Optional  }
			  );
            
               config.Routes.MapHttpRoute(
			      name: "QuizDelete",
			      routeTemplate: "{controller}/{questionid}",
			      defaults: new { id = RouteParameter.Optional  }
			  );
            
              config.Routes.MapHttpRoute(
			      name: "QuizCopy",
			      routeTemplate: "{controller}/{questionid}/copy/{newid}",
			      defaults: new { newid = RouteParameter.Optional  }
			  );
            
            


        }
    }
}
