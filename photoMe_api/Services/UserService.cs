using System;
using System.Threading.Tasks;
using photoMe_api.Helpers;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IUserService
    {
        Task<User> GetUser(Guid userId);
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<bool> SaveAll();
    }
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserRepository _userService;

        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._userService = this._unitOfWork.UserRepository();
        }
        public Task<User> GetUser(Guid userId)
        {
            return this._userService.GetUser(userId);
        }

        public Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            return this._userService.GetUsers(userParams);
        }

        public Task<bool> SaveAll()
        {
            return this._unitOfWork.SaveAsync();
        }
    }
}