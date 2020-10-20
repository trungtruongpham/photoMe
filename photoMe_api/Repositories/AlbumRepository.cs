using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IAlbumRepository : IBaseRepository<Album>
    {
        Task<IEnumerable<Album>> GetAlbumsByUserId(Guid userId);
    }
    public class AlbumRepository : BaseRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Album>> GetAlbumsByUserId(Guid userId)
        {
            return await this.context.Albums.Where(a => a.PhotographerId.Equals(userId)).ToListAsync();
        }
    }
}