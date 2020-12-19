using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using photoMe_api.Data;
using photoMe_api.DTO;
using photoMe_api.Models;

namespace photoMe_api.Repositories
{
    public interface ISelectOptionsRepository: IBaseRepository<SelectOption>
    {
        IEnumerable<SelectOption> GetAll();
    }
    public class SelectOptionRepository : BaseRepository<SelectOption>, ISelectOptionsRepository
    {
        public SelectOptionRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<Models.SelectOption> GetAll()
        {
            return this.GetList();
        }
    }
}