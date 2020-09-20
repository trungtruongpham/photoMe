using System;

namespace photoMe_api.Models
{
    public class Like : BaseModel
    {
        public Guid? LikerId { get; set; }
        public User Liker { get; set; }
        public Guid? LikeeId { get; set; }
        public User Likee { get; set; }
    }
}