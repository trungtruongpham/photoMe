using System;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IPhotoService
    {
        Task<Photo> GetPhoto(Guid photoId);
        Task<Photo> GetMainPhotoForUser(Guid userId);
        bool DeletePhoto(Photo photoToDelete);
        Task<bool> SaveAllAsync();
    }
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PhotoRepository _photoRepository;

        public PhotoService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._photoRepository = this._unitOfWork.PhotoRepository();
        }

        public bool DeletePhoto(Photo photoToDelete)
        {
            return this._photoRepository.DeletePhoto(photoToDelete);
        }

        public Task<Photo> GetMainPhotoForUser(Guid userId)
        {
            return this._photoRepository.GetMainPhotoForUser(userId);
        }

        public Task<Photo> GetPhoto(Guid photoId)
        {
            return this._photoRepository.GetPhoto(photoId);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await this._unitOfWork.SaveAsync();
        }
    }
}