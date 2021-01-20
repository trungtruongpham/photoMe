using System;

namespace photoMe_api.DTO.PhotoShoot
{
    public class PhotoShootForReturnDto
    {
        public DateTime ShootDate { get; set; }
        public string Status { get; set; }
        public Guid ModelId { get; set; }
        public Guid PhotographerId { get; set; }
        public string ShootTime { get; set; }
        public string ModelName { get; set; }
        public string PhotographerName { get; set; }
        public int Price { get; set; }
    }
}