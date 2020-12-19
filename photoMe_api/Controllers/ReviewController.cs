using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using photoMe_api.DTO;
using photoMe_api.DTO.ReviewDto;
using photoMe_api.Models;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [ApiController]
    [Route("/api/review/")]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IMapper _mapper;
        private readonly INotificationService _notifService;

        public ReviewController(IReviewService reviewService, IMapper mapper, INotificationService notifService)
        {
            this._reviewService = reviewService;
            this._mapper = mapper;
            this._notifService = notifService;
        }

        [HttpPost("new-review")]
        public async Task<IActionResult> ReviewAlbumAsync([FromBody] ReviewForCreationDto newReview)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Input is invalid");
            }

            Review review = this._mapper.Map<Review>(newReview);

            if (await this._reviewService.ReviewAlbum(review))
            {
                ReviewForListDto reviewToReturn = this._mapper.Map<ReviewForListDto>(review);
                var listUserReview = await this._reviewService.GetListUserReview(new Guid(newReview.AlbumId.ToString()));
                var senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var senderName = User.FindFirstValue(ClaimTypes.Name);

                await this._notifService.SendNoti(new Guid(senderId), listUserReview.ToList(), senderName + " bình luận bài viết!");

                return Ok(reviewToReturn);
            }

            return BadRequest("Failed to review album");
        }

        [HttpGet("{albumId}")]
        public async Task<IActionResult> GetAlbumReviews(Guid albumId)
        {
            var reviewList = await this._reviewService.GetAlbumReviews(albumId);

            if (reviewList != null)
            {
                var listReviewReturn = new List<ReviewForListDto>();

                foreach (Review review in reviewList)
                {
                    var reviewToReturn = this._mapper.Map<ReviewForListDto>(review);
                    var userForList = this._mapper.Map<UserForListDto>(review.Maker);

                    reviewToReturn.Maker = userForList;
                    listReviewReturn.Add(reviewToReturn);
                }
                return Ok(listReviewReturn);
            }

            return BadRequest("Failed to get reviews");
        }

        [HttpGet("{albumId}/listUserReview")]
        public async Task<IActionResult> GetListUserReviewAsync(Guid albumId)
        {
            return Ok(await this._reviewService.GetListUserReview(albumId));
        }

        [HttpGet("{albumId}/paged")]
        public async Task<IActionResult> GetPagedReviewAsync([FromQuery] int page, int size, Guid albumId)
        {
            IEnumerable<Review> listReviews = await this._reviewService.GetPagedReview(page, size, albumId);
            var listReviewToReturn = new List<ReviewForListDto>();

            foreach (Review review in listReviews)
            {
                var reviewForList = this._mapper.Map<ReviewForListDto>(review);

                listReviewToReturn.Add(reviewForList);
            }

            return Ok(listReviewToReturn);
        }
    }
}