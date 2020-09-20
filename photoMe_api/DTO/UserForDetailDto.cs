using System;
using System.Collections.Generic;

namespace photoMe_api.DTO
{
    public class UserForDetailDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime LastActive { get; set; }
        public int Age { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}