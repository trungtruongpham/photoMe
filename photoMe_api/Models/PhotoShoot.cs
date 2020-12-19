using System;

namespace photoMe_api.Models
{
    public class PhotoShoot : BaseModel
    {
        public Guid? PhotographerId { get; set; }
        public User Photographer { get; set; }
        public Guid? ModelId { get; set; }
        public User Model { get; set; }
        public string Location { get; set; }
        public int Price { get; set; }
        public DateTime ShootTime { get; set; }
        public DateTime ShootDate { get; set; }
        public string MeetingPlaceDetail { get; set; }
        public string MeetingPlace { get; set; }
        public string AdditionalInfo { get; set; }
        public AdditionalService AdditionalService { get; set; }
        public Package Package { get; set; }
    }
}