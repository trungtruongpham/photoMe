using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IReviewRepository : IBaseRepository<Review>
    {
        Task<bool> ReviewAlbum(Review newReview);
        Task<IEnumerable<Review>> GetAlbumReviews(Guid albumId);
        Task<IEnumerable<Guid>> GetListUserReview(Guid albumId);
    }
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        public ReviewRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Review>> GetAlbumReviews(Guid albumId)
        {
            return await this.dbSet.Include(r => r.Maker).Where(r => r.AlbumId.Equals(albumId)).ToListAsync();
        }

        public async Task<IEnumerable<Guid>> GetListUserReview(Guid albumId)
        {
            var listUserReview = await this.dbSet.Where(a => a.AlbumId.Equals(albumId)).Select(a => a.MakerId).Distinct().ToListAsync();
            return listUserReview.Select(g => g ?? Guid.Empty).ToList();
        }

        public async Task<bool> ReviewAlbum(Review newReview)
        {
            return await this.InsertAsync(newReview);
        }
    }
}