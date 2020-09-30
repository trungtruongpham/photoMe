using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace photoMe_api.Controllers
{
    [Route("/api/demo/[action]")]
    [ApiController]
    public class DemoController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public string GetDemoWithAuthorize(){
            return "Information with authorize";
        }

        [HttpGet]
        public string GetDemoWithoutAuthorize(){
            return "Information without authorize";
        }
    }
}