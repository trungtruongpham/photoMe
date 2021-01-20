using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IPhotoShootRepository : IBaseRepository<PhotoShoot>
    {
        Task<IEnumerable<PhotoShoot>> GetListShootByPhotographer(Guid userId);
        Task<IEnumerable<PhotoShoot>> GetListShootByModel(Guid userId);
        Task<IEnumerable<PhotoShoot>> GetListShootByDate(Guid userId, DateTime date);
    }
    public class PhotoShootRepository : BaseRepository<PhotoShoot>, IPhotoShootRepository
    {
        public PhotoShootRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByModel(Guid userId)
        {
            return await this.dbSet.Where(ps => ps.ModelId.Equals(userId)).ToListAsync();
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByDate(Guid userId, DateTime date)
        {
            return await this.dbSet.Where(ps => ps.PhotographerId.Equals(userId) && ps.ShootDate.Equals(date)).OrderByDescending(ps => ps.ShootTime).ToListAsync();
        }

        public async Task<IEnumerable<PhotoShoot>> GetListShootByPhotographer(Guid userId)
        {
            return await this.dbSet.Where(ps => ps.PhotographerId.Equals(userId)).ToListAsync();
        }
    }
}
