using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface INotificationService
    {
        Task<bool> SendNoti(Guid senderId, List<Guid> receiverList, string notiMessage);
        Task<IEnumerable<Notification>> GetUserNoti(Guid userId);
    }
    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly NotificationRepository _notifRepository;

        public NotificationService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._notifRepository = this._unitOfWork.NotificationRepository();
        }

        public async Task<IEnumerable<Notification>> GetUserNoti(Guid userId)
        {
            return await this._notifRepository.GetUserNoti(userId);
        }

        public Task<bool> SendNoti(Guid senderId, List<Guid> receiverList, string notiMessage)
        {
            return this._notifRepository.SendNoti(senderId, receiverList, notiMessage);
        }
    }
}