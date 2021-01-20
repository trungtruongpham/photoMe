using System.Collections.Generic;

namespace photoMe_api.Models
{
    public class Package : BaseModel
    {
        public virtual string Name { get; set; }
        public virtual int Duration { get; set; }
        public string EditPhotos { get; set; }
        public string DownloadPhotos { get; set; }
        public int Price { get; set; }
        public ICollection<PhotoShoot> PhotoShoots { get; set; }
    }
}