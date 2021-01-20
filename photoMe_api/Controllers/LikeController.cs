using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using photoMe_api.Models;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [Route("/api/user/{userId}/likes/")]
    [ApiController]
    [Authorize]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly INotificationService _notifService;
        private readonly IAlbumService _albumService;

        public LikeController(ILikeService likeService, IUserService userService, IMapper mapper, INotificationService notiService, IAlbumService albumService)
        {
            this._likeService = likeService;
            this._userService = userService;
            this._mapper = mapper;
            this._notifService = notiService;
            this._albumService = albumService;
        }

        [HttpGet("all")]
        public IActionResult GetAllLikesAsync(Guid userId)
        {
            var listLikes = this._likeService.GetAllLike();

            if (listLikes != null)
            {
                return Ok(listLikes);
            }

            return BadRequest("Get list Like failed!");
        }

        [HttpPost("like-album")]
        public async Task<IActionResult> LikeAlbumAsync([FromBody] Like newLike, Guid userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid!");
            }

            var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var senderName = User.FindFirstValue(ClaimTypes.Name);
            var album = await this._albumService.GetAlbumById(new Guid(newLike.AlbumId.ToString()));

            if (await this._likeService.IsAlbumLiked(userId, (Guid)newLike.AlbumId))
            {
                if (await this._likeService.UnlikeAlbum(userId, (Guid)newLike.AlbumId))
                {
                    return Ok();
                }

                return BadRequest("Unlike failed");
            }

            if (await this._likeService.LikeAlbum(newLike))
            {
                var sendResult = await this._notifService.SendNoti(new Guid(senderId), new List<Guid> { new Guid(album.PhotographerId.ToString()) }, senderName + " liked your album!");

                if (sendResult)
                {
                    return Ok(newLike);
                }
            }

            return BadRequest("Like failed");
        }

        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetUserLikeAsync(Guid albumId, Guid userId)
        {
            var likeToReturn = await this._likeService.GetUserLike(userId, albumId);

            return Ok(likeToReturn);
        }
    }
}