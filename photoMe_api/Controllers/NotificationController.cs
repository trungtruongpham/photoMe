using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [Route("/api/noti/")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notiService;
        private readonly IMapper _mapper;

        public NotificationController(INotificationService notiService, IMapper mapper)
        {
            this._notiService = notiService;
            this._mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserNotiAsync(Guid userId)
        {
            var listUserNoti = await this._notiService.GetUserNoti(userId);

            if (listUserNoti != null)
            {
                return Ok(listUserNoti);
            }

            return BadRequest("Get user noti failed!");
        }
    }
}