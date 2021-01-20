using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.CompilerServices;
using photoMe_api.DTO.PhotoShoot;
using photoMe_api.DTO.PhotoShootDto;
using photoMe_api.Models;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [ApiController]
    [Route("/api/photoshoot/")]
    [Authorize]
    public class PhotoShootController : ControllerBase
    {
        private readonly IPhotoShootService _photoShootService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public PhotoShootController(IPhotoShootService photoShootService, IMapper mapper, IUserService userService
        )
        {
            this._photoShootService = photoShootService;
            this._mapper = mapper;
            this._userService = userService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetListShootByUserAsync(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Invalid id!");
            }

            User user = await this._userService.GetUser(userId);
            List<PhotoShoot> listShoot;
            if (user.Role == "Photographer")
            {
                listShoot = await this._photoShootService.GetListShootByPhotographer(userId) as List<PhotoShoot>;
            }
            else
            {
                listShoot = await this._photoShootService.GetListShootByModel(userId) as List<PhotoShoot>;
            }
            
            var listShootReturn = this._mapper.Map<List<PhotoShootForReturnDto>>(listShoot);
            foreach (var shootReturn in listShootReturn)
            {
                User photographer = await this._userService.GetUser(shootReturn.PhotographerId);
                User model = await this._userService.GetUser(shootReturn.ModelId);

                shootReturn.PhotographerName = photographer.Name;
                shootReturn.ModelName = model.Name;
            }
            
            if (listShootReturn != null)
            {
                return Ok(listShootReturn);
            }

            return BadRequest("Get list photoshoot failed");
        }

        [HttpPost("")]
        public async Task<IActionResult> BookingNewShootAsync(PhotoShootForInputDto newShoot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model is note valid");
            }

            var newPhotoShoot = this._mapper.Map<PhotoShoot>(newShoot);
            newPhotoShoot.Status = "Pending";
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