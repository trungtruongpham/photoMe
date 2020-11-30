using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace photoMe_api.Models
{
    public class Review : BaseModel
    {
        public Guid? MakerId { get; set; }
        [JsonIgnore]
        public User Maker { get; set; }

        [ForeignKey("Albums")]
        public Guid? AlbumId { get; set; }
        public Album Album { get; set; }
        public string ReviewMessage { get; set; }
        public float Stars { get; set; }
    }
}