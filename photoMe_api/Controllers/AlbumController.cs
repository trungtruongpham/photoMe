using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using photoMe_api.DTO;
using photoMe_api.Helpers;
using photoMe_api.Models;
using photoMe_api.Services;

namespace photoMe_api.Controllers
{
    [ApiController]
    [Route("/api/user/{userId}/albums")]
    [Authorize]
    public class AlbumController : ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IActionContextAccessor _acctionContextAccessor;
        private readonly IUserService _userService;
        private readonly Cloudinary _cloudinary;
        private IAlbumService _albumService;

        public AlbumController(IPhotoService photoService, IUserService userService, IMapper mapper,
         IOptions<CloudinarySettings> cloudinaryConfig, IActionContextAccessor actionContextAccessor)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _photoService = photoService;
            _acctionContextAccessor = actionContextAccessor;
            _userService = userService;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost("upload-album")]
        public async Task<IActionResult> UploadAlbum(Guid userId, [FromForm] AlbumForCreationDto albumForCreationDto)
        {
            if (!userId.Equals(new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier))))
            {
                return Unauthorized();
            }

            var userFromRepo = await _userService.GetUser(userId);
            var uploadResult = new ImageUploadResult();
            var album = new Album();
            List<PhotoForReturnDto> listPhotosForReturn = new List<PhotoForReturnDto>();
            List<Photo> listPhoto = new List<Photo>();

            foreach (var image in albumForCreationDto.Files)
            {
                if (image.Length > 0)
                {
                    using (var stream = image.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(image.Name, stream),
                            Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face"),
                        };

                        uploadResult = _cloudinary.Upload(uploadParams);
                    }
                }

                PhotoForCreationDto photoForCreationDto = new PhotoForCreationDto();
                photoForCreationDto.Url = uploadResult.Url.ToString();
                photoForCreationDto.PublicId = uploadResult.PublicId;
                photoForCreationDto.DateAdded = DateTime.UtcNow;
                var photo = _mapper.Map<Photo>(photoForCreationDto);

                if (!userFromRepo.Photos.Any(u => u.IsMain))
                {
                    photo.IsMain = true;
                }

                userFromRepo.Photos.Add(photo);
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                listPhotosForReturn.Add(photoToReturn);
                listPhoto.Add(photo);
            }

            album.Photos = listPhoto;
            album.PhotographerId = userFromRepo.Id;
            Console.WriteLine(album.Photos.Count());
            if (album == null)
            {
                return BadRequest();
            }


            if (await _userService.SaveAll())
            {
                if (await this._albumService.InsertAlbum(album))
                    return BadRequest();
                return CreatedAtRoute("", new { userId = userId }, listPhotosForReturn);
            }

            return BadRequest("Could not add photo");
        }
        [HttpPost("new-album")]
        public async Task<IActionResult> InsertNewAlbum(Album album)
        {
            if (await this._albumService.InsertAlbum(album))
            {
                return Ok();
            }
            else
                return BadRequest();
        }
    }


}