using System;

namespace photoMe_api.DTO.PhotoShootDto
{
    public class PhotoShootForInputDto
    {
        public Guid PhotographerId { get; set; }
        public Guid ModelId { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public DateTime ShootTime { get; set; }
    }
}