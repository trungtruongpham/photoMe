using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using photoMe_api.Models;
using photoMe_api.Repositories;

namespace photoMe_api.Services
{
    public interface IReviewService
    {
        Task<IEnumerable<Review>> GetAlbumReviews(Guid albumId);
        Task<bool> ReviewAlbum(Review newReview);
        Task<IEnumerable<Guid>> GetListUserReview(Guid albumId);
        Task<IEnumerable<Review>> GetPagedReview(int page, int size, Guid albumId);
    }
    public class ReviewService : IReviewService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ReviewRepository _reviewRepository;

        public ReviewService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._reviewRepository = this._unitOfWork.ReviewRepository();
        }

        public async Task<IEnumerable<Review>> GetAlbumReviews(Guid albumId)
        {
            return await this._reviewRepository.GetAlbumReviews(albumId);
        }

        public async Task<IEnumerable<Guid>> GetListUserReview(Guid albumId)
        {
            return await this._reviewRepository.GetListUserReview(albumId);
        }

        public async Task<IEnumerable<Review>> GetPagedReview(int page, int size, Guid albumId)
        {
            return await this._reviewRepository.GetPagedReview(page, size ,albumId);
        }

        public async Task<bool> ReviewAlbum(Review newReview)
        {
            return await this._reviewRepository.ReviewAlbum(newReview);
        }
    }
}