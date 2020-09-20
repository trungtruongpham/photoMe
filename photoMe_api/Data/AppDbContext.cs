using Microsoft.EntityFrameworkCore;
using photoMe_api.Models;

namespace photoMe_api.Data {
        public class AppDbContext : DbContext {
                public AppDbContext (DbContextOptions<AppDbContext> options) : base (options) {

                }
                public virtual DbSet<Album> Albums { get; set; }
                public virtual DbSet<Constant> Constants { get; set; }
                public virtual DbSet<Like> Likes { get; set; }
                public virtual DbSet<Message> Messages { get; set; }
                public virtual DbSet<Notification> Notifications { get; set; }
                public virtual DbSet<Photo> Photos { get; set; }
                public virtual DbSet<PhotoShoot> PhotoShoots { get; set; }
                public virtual DbSet<Review> Reviews { get; set; }
                public virtual DbSet<User> Users { get; set; }

                protected override void OnModelCreating (ModelBuilder builder) {
                        base.OnModelCreating (builder);

                        builder.Entity<Album> ().ToTable ("Albums").HasKey(a => new {a.ModelId, a.PhotographerId});
                        builder.Entity<Constant> ().ToTable ("Constants");
                        builder.Entity<Like> ().ToTable ("Likes").HasKey (l => new { l.LikeeId, l.LikerId });
                        builder.Entity<Message> ().ToTable ("Messages").HasKey(m => new {m.SenderId, m.ReceiverId});
                        builder.Entity<Notification> ().ToTable ("Notifications").HasKey(n => new {n.SenderId, n.ReceiverId});
                        builder.Entity<Photo> ().ToTable ("Photos");
                        builder.Entity<PhotoShoot> ().ToTable ("PhotoShoots").HasKey(ps => new {ps.ModelId, ps.PhotographerId});
                        builder.Entity<Review> ().ToTable ("Reviews");
                        builder.Entity<User> ().ToTable ("Users");

                        builder.Entity<Like> ()
                                .HasOne<User> (u => u.Likee)
                                .WithMany (u => u.Likers)
                                .HasForeignKey (l => l.LikeeId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Like> ()
                                .HasOne<User> (u => u.Liker)
                                .WithMany (u => u.Likees)
                                .HasForeignKey (l => l.LikerId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Message> ()
                                .HasOne<User> (m => m.Sender)
                                .WithMany (u => u.ReceiverMessages)
                                .HasForeignKey (m => m.SenderId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Message> ()
                                .HasOne<User> (m => m.Receiver)
                                .WithMany (u => u.SenderMessages)
                                .HasForeignKey (m => m.ReceiverId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Notification> ()
                                .HasOne<User> (m => m.Sender)
                                .WithMany (u => u.ReceiverNotifications)
                                .HasForeignKey (m => m.SenderId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Notification> ()
                                .HasOne<User> (m => m.Receiver)
                                .WithMany (u => u.SenderNotifications)
                                .HasForeignKey (m => m.ReceiverId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Album> ()
                                .HasOne<User> (a => a.Photographer)
                                .WithMany (p => p.PhotographerAlbums)
                                .HasForeignKey (a => a.PhotographerId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<Album> ()
                                .HasOne<User> (a => a.Model)
                                .WithMany (m => m.ModelAlbums)
                                .HasForeignKey (a => a.ModelId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<PhotoShoot> ()
                                .HasOne<User> (ps => ps.Photographer)
                                .WithMany (m => m.PhotographerPhotoShoots)
                                .HasForeignKey (a => a.PhotographerId)
                                .OnDelete (DeleteBehavior.Restrict);

                        builder.Entity<PhotoShoot> ()
                                .HasOne<User> (ps => ps.Model)
                                .WithMany (m => m.ModelPhotoShoots)
                                .HasForeignKey (a => a.ModelId)
                                .OnDelete (DeleteBehavior.Restrict);

                }
        }
}