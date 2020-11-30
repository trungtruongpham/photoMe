using System;

namespace photoMe_api.DTO.ReviewDto
{
    public class ReviewForCreationDto
    {
        public Guid AlbumId { get; set; }
        public Guid MakerId { get; set; }
        public string ReviewMessage { get; set; }
    }
}