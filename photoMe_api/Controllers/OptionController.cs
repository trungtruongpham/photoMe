using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [Route("/api/options/")]
    [ApiController]
    [Authorize]
    public class OptionController : ControllerBase
    {
        private readonly ISelectOptionService _selectOptionsService;

        public OptionController(ISelectOptionService selectOptionService)
        {
            this._selectOptionsService = selectOptionService;
        }

        [HttpGet("all")]
        public IActionResult GetAllOptions()
        {
            var options = this._selectOptionsService.GetAll();

            if (options != null)
            {
                return Ok(options);
            }

            return BadRequest("Failed to get options");
        }
    }
}