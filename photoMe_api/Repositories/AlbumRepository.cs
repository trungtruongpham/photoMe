using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IAlbumRepository : IBaseRepository<Album>
    {

    }
    public class AlbumRepository : BaseRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(AppDbContext context) : base(context)
        {
        }
    }
}