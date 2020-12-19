using System;
using System.Collections.Generic;
using photoMe_api.Models;

namespace photoMe_api.DTO
{
    public class AlbumForListDto
    {
        public Guid Id { get; set; }
        public UserForListDto Photographer { get; set; }
        public string Title { get; set; }
        public string AlbumType { get; set; }
        public ICollection<PhotoForReturnDto> Photos { get; set; }
        public int LikesNumber { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}