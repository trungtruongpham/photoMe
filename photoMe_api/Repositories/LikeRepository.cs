using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface ILikeRepository: IBaseRepository<Like>{

    }
    public class LikeRepository : BaseRepository<Like>, ILikeRepository
    {
        public LikeRepository(AppDbContext context) : base(context)
        {
        }
    }
}