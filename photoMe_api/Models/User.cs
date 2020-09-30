using System;
using System.Collections.Generic;

namespace photoMe_api.Models
{
    public class User : BaseModel
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime JoinDate { get; set; }
        public Photo Avatar { get; set; }
        public ICollection<Album> PhotographerAlbums { get; set; }
        public ICollection<Album> ModelAlbums { get; set; }
        public ICollection<Message> SenderMessages { get; set; }
        public ICollection<Message> ReceiverMessages { get; set; }
        public ICollection<Like> Likees { get; set; }
        public ICollection<Like> Likers { get; set; }
        public ICollection<Notification> SenderNotifications { get; set; }
        public ICollection<Notification> ReceiverNotifications { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<PhotoShoot> PhotographerPhotoShoots { get; set; }
        public ICollection<PhotoShoot> ModelPhotoShoots { get; set; }
    }
}