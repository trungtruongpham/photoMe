using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IPhotoShootService
    {
        Task<PhotoShoot> BookingNewShootAsync(PhotoShoot newShoot);
        Task<IEnumerable<PhotoShoot>> GetListShootByPhotographer(Guid userId);
        Task<IEnumerable<PhotoShoot>> GetListShootByModel(Guid userId);
        Task<IEnumerable<PhotoShoot>> GetListShootByDate(Guid userId, DateTime date);
    }
    public class PhotoShootService : IPhotoShootService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PhotoShootRepository _photoShootRepository;

        public PhotoShootService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._photoShootRepository = this._unitOfWork.PhotoShootRepository();
        }
        public async Task<PhotoShoot> BookingNewShootAsync(PhotoShoot newShoot)
        {
            if (await this._photoShootRepository.InsertAsync(newShoot))
            {
                return newShoot;
            }

            return null;
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByModel(Guid userId)
        {
            return await this._photoShootRepository.GetListShootByModel(userId);
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByDate(Guid userId, DateTime date)
        {
            return await this._photoShootRepository.GetListShootByDate(userId, date);
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByPhotographer(Guid userId)
        {
            return await this._photoShootRepository.GetListShootByPhotographer(userId);
        }
    }
}