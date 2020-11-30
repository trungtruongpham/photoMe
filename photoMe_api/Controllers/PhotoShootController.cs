using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using photoMe_api.DTO.PhotoShootDto;
using photoMe_api.Models;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [ApiController]
    [Route("/api/shoot/")]
    public class PhotoShootController : ControllerBase
    {
        private readonly IPhotoShootService _photoShootService;
        private IMapper _mapper;

        public PhotoShootController(IPhotoShootService photoShootService, IMapper mapper)
        {
            this._photoShootService = photoShootService;
            this._mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetListShootByUserAsync(Guid userId)
        {
            var listShoot = await this._photoShootService.GetListShootByUserAsync(userId);

            if (listShoot != null)
            {
                return Ok(listShoot);
            }

            return BadRequest("Get list shoot failed");
        }

        [HttpPost("book-new-shoot")]
        public async Task<IActionResult> BookingNewShootAsync(PhotoShootForInputDto newShoot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model is note valid");
            }

            var newPhotoShoot = this._mapper.Map<PhotoShoot>(newShoot);
            var result = await this._photoShootService.BookingNewShootAsync(newPhotoShoot);

            if (result != null)
            {
                return Ok(newShoot);
            }

            return BadRequest("Failed to book");
        }

        [HttpGet("by-date")]
        public async Task<IActionResult> GetListShootByDateAsync([FromQuery] Guid userId, DateTime shootTime)
        {
            var result = await this._photoShootService.GetListShootByDate(userId, shootTime);
        
            return Ok(result);
        }
    }
}