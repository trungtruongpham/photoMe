using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using Newtonsoft.Json;
using photoMe_api.Models;

namespace photoMe_api.Data
{
    public class Seed
    {
        public static void SeedUser(AppDbContext context)
        {
            if (context.Users.Any()) return;
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();
                user.UpdatedAt = DateTime.Now;

                context.Users.Add(user);
            }
        }

        public static void SeedOptions(AppDbContext context)
        {
            if (context.SelectOptions.Any()) return;
            var optionsData = System.IO.File.ReadAllText("Data/OptionsSeedData.json");
            var options = JsonConvert.DeserializeObject<List<SelectOption>>(optionsData);

            foreach (var option in options)
            {
                option.CreatedAt = DateTime.Now;
                option.UpdatedAt = DateTime.Now;

                context.SelectOptions.Add(option);
            }
        }

        public static void SeedPackage(AppDbContext context)
        {
            if (context.Packages.Any()) return;
            var optionsData = System.IO.File.ReadAllText("Data/PackageSeedData.json");
            var options = JsonConvert.DeserializeObject<List<Package>>(optionsData);

            foreach (var option in options)
            {
                option.CreatedAt = DateTime.Now;
                option.UpdatedAt = DateTime.Now;

                context.Packages.Add(option);
            }
        }

        public static void SeedData(AppDbContext context)
        {
            SeedUser(context);
            SeedOptions(context);
            SeedPackage(context);

            context.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}