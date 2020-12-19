namespace photoMe_api.Models
{
    public class SelectOption : BaseModel
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
    }
}