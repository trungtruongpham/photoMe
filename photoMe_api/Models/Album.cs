using System;
using System.Collections.Generic;

namespace photoMe_api.Models
{
    public class Album : BaseModel
    {
        public string AlbumType { get; set; }
        public Guid? PhotographerId { get; set; }
        public virtual User Photographer { get; set; }
        public Guid? ModelId { get; set; }
        public virtual User Model { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}