using System;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IAlbumService
    {
        Task<bool> InsertAlbum(Album album);
    }
    public class AlbumService : IAlbumService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AlbumRepository _albumRepository;

        public AlbumService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._albumRepository = this._unitOfWork.AlbumRepository();
        }

        public Task<bool> InsertAlbum(Album album)
        {
            return this._albumRepository.InsertAsync(album);
        }
    }
}