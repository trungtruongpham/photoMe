namespace photoMe_api.Models
{
    public class Package : BaseModel
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        public int EditPhotos { get; set; }
        public int DownloadPhotos { get; set; }
        public int Price { get; set; }
    }
}