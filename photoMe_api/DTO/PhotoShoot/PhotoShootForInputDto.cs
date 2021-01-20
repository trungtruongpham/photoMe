using System;

namespace photoMe_api.DTO.PhotoShootDto
{
    public class PhotoShootForInputDto
    {
        public Guid PhotographerId { get; set; }
        public Guid ModelId { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public string ShootTime { get; set; }
        public DateTime ShootDate { get; set; }
        public string MeetingPlace { get; set; }
        public string AdditpionalInfo { get; set; }
        public string PaymentMethod { get; set; }
    }
}