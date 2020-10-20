using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IAlbumService
    {
        Task<bool> InsertAlbum(Album album);
        Task<IEnumerable<Album>> GetAlbumsByUserId(Guid userId);
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

        public Task<IEnumerable<Album>> GetAlbumsByUserId(Guid userId)
        {
            return this._albumRepository.GetAlbumsByUserId(userId);
        }

        public Task<bool> InsertAlbum(Album album)
        {
            album.CreatedAt = DateTime.Now;
            album.UpdatedAt = DateTime.Now;
            
            return this._albumRepository.InsertAsync(album);
        }
    }
}