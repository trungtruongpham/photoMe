using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;
using photoMe_api.Data;
using photoMe_api.Helpers;
using photoMe_api.Repositories;
using photoMe_api.Services;

namespace photoMe_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                    .AddNewtonsoftJson(opt =>
                    {
                        opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                        opt.SerializerSettings.ContractResolver = new DefaultContractResolver
                        {
                            NamingStrategy = new CamelCaseNamingStrategy(),
                        };
                    });

            services.AddCors();
            services.AddAutoMapper(typeof(UserRepository).Assembly);
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<IAlbumRepository, AlbumRepository>()
                    .AddScoped<IUnitOfWork, UnitOfWork>()
                    .AddScoped<IAuthRepository, AuthRepository>()
                    .AddScoped<IConstantRepository, ConstantRepository>()
                    .AddScoped<ILikeRepository, LikeRepository>()
                    .AddScoped<IMessageRepository, MessageRepository>()
                    .AddScoped<INotificationRepository, NotificationRepository>()
                    .AddScoped<IPhotoRepository, PhotoRepository>()
                    .AddScoped<IPhotoShootRepository, PhotoShootRepository>()
                    .AddScoped<IReviewRepository, ReviewRepository>()
                    .AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IAlbumService, AlbumService>()
                    .AddScoped<IAuthService, AuthService>();
            // .AddScoped<IConstantService, ConstantService>()
            // .AddScoped<ILikeService, LikeService>()
            // .AddScoped<IMessageService, MessageService>()
            // .AddScoped<INotificationService, NotificationService>()
            // .AddScoped<IPhotoService, PhotoService>()
            // .AddScoped<IPhotoShootService, PhotoShootService>()
            // .AddScoped<IReviewService, ReviewService>()
            // .AddScoped<IUserService, UserService>();

            services.AddControllers();

            services.AddSwaggerGen();

            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

            services.AddScoped<LogUserActivity>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            // app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
