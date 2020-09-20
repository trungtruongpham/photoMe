using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IMessageRepository: IBaseRepository<Message>{

    }
    public class MessageRepository : BaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(AppDbContext context) : base(context)
        {
        }
    }
}