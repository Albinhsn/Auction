namespace AuthenticationService.Models
{
    public class AuthenticateUserRequest
    {
        public string? Username { get; set; } 
       
        public string getUsername()
        {
            return this.Username;
        }

        public string? Password { get; set; }

        public string getPassword()
        {
            return this.Password;
        }

    }
}
