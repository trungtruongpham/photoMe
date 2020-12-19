using System.Collections.Generic;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface ISelectOptionService
    {
        IEnumerable<SelectOption> GetAll();
    }
    public class SelectOptionService : ISelectOptionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly SelectOptionRepository _selectOptionRepo;

        public SelectOptionService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._selectOptionRepo = this._unitOfWork.SelectOptionRepository();
        }
        public IEnumerable<SelectOption> GetAll()
        {
            return this._selectOptionRepo.GetAll();
        }
    }
}