namespace AuthenticationService.Models
{
    public class ChangePasswordModel
    {
        public string? OldPasswordPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? MatchingNewPassword { get; set; }
        public string? Token { get; set; }
    }
}
