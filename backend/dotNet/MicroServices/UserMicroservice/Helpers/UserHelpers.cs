using System.Net.Mail;
using UserMicroservice.Models;

namespace UserMicroservice.Helpers
{
    public class UserHelpers
    {

        public bool IsEmail(string email)
        {
            try
            {
                MailAddress m =new (email);

                return true;
            }
            catch(FormatException)
            {
                return false;
            }
        }


        public string ValidateUserPostModel(UserPostModel user)
        {
            if (user.Email != user.MatchingEmail)
            {
                return "Email adresserna matchar inte";
            }
            if (!IsEmail(user.Email))
            {
                return "Vänligen angiv en korrekt email";
            }            
            if (user.Password != user.MatchingPassword)
            {
                return "Lösenorden matchar inte";
            }
            if (user.Password == ""){
                return "Vänligen fyll i ett lösenord";
            }
            if (user.Password.Length <= 3){
                return "Vänligen fyll i ett lösenord som är mer än 3 tecken";
            }
            if (user.Name == ""){
                return "Vänligen fyll i ett Namn";
            }
            return "";
        }
    }
}
