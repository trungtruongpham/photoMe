using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoMe_api.Data;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface IBaseRepository<T> where T : BaseModel
    {
        IEnumerable<T> GetList();
        Task<bool> InsertAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(Guid id);
        Task<T> GetByIdAsync(Guid id);
        Task<bool> SaveAll();
    }
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseModel
    {
        protected AppDbContext context;
        protected DbSet<T> dbSet;
        public BaseRepository(AppDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
        }


        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await dbSet.SingleOrDefaultAsync(e => e.Id.Equals(id));
            if (entity == null)
            {
                return false;
            }

            var result = context.Remove(entity);
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            var entity = await dbSet.SingleOrDefaultAsync(e => e.Id.Equals(id));

            if (entity == null)
            {
                Console.WriteLine("abc");
                return null;
            }

            return entity;
        }

        public IEnumerable<T> GetList()
        {
            var list = dbSet.AsAsyncEnumerable();
            return (IEnumerable<T>)list;
        }

        public async Task<bool> InsertAsync(T entity)
        {
            if (entity == null)
            {
                return false;
            }

            await context.AddAsync(entity);
            return context.SaveChanges() > 0;
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            if (entity == null)
            {
                return false;
            }

            dbSet.Update(entity);
            return await context.SaveChangesAsync() > 0;
        }
    }
}