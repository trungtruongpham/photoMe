using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IAlbumService
    {

    }
    public class AlbumService : IAlbumService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AlbumService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
    }
}