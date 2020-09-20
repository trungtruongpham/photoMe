using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IReviewRepository : IBaseRepository<Review>
    {

    }
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        public ReviewRepository(AppDbContext context) : base(context)
        {
        }
    }
}