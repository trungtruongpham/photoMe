using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
        Task<bool> SendNoti(Guid senderId, List<Guid> receiverList, string notiMessage);
        Task<IEnumerable<Notification>> GetUserNoti(Guid userId);
    }
    public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Notification>> GetUserNoti(Guid userId)
        {
            return await this.dbSet.Where(n => n.ReceiverId.Equals(userId)).OrderByDescending(n => n.CreatedAt).ToListAsync();
        }

        public async Task<bool> SendNoti(Guid senderId, List<Guid> receiverList, string notiMessage)
        {
            foreach (var receiver in receiverList)
            {
                if (!senderId.Equals(receiver))
                {
                    Notification newNoti = new Notification();
                    newNoti.ReceiverId = receiver;
                    newNoti.SenderId = senderId;
                    newNoti.NotiMessage = notiMessage;

                    if (!await this.InsertAsync(newNoti))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}