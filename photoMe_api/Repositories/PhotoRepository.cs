using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IPhotoRepository: IBaseRepository<Photo>{

    }
    public class PhotoRepository : BaseRepository<Photo>, IPhotoRepository
    {
        public PhotoRepository(AppDbContext context) : base(context)
        {
        }
    }
}