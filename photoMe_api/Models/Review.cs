using System;

namespace photoMe_api.Models
{
    public class Review : BaseModel
    {
        public Guid? MakerId { get; set; }
        public User Maker { get; set; }
        public Guid? AlbumId { get; set; }
        public Album Album { get; set; }
        public string ReviewMessage { get; set; }
        public float Stars { get; set; }
    }
}