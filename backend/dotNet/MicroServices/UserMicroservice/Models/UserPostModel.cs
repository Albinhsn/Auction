namespace UserMicroservice.Models
{
    public class UserPostModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string MatchingEmail { get; set; }        
        public string Password { get; set; }
        public string MatchingPassword { get; set; }

    }
}
