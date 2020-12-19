using System;

namespace photoMe_api.Models
{
    public class CreditCard : BaseModel
    {
        public string CardName { get; set; }
        public string CardNumber { get; set; }
        public string ExpireDate { get; set; }
        public int CCV { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}