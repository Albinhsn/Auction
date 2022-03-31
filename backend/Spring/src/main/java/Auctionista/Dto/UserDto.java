package Auctionista.Dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import Auctionista.Annotations.Email.ValidEmail;
import Auctionista.Annotations.Password.ValidPassword;
import Auctionista.Annotations.Username.ValidUsername;

@ValidEmail
@ValidPassword
@ValidUsername
public class UserDto {
    
    @NotNull
    @NotEmpty
    private String email;
    private String matchingEmail;


    @NotNull
    @NotEmpty
    private String password;
    private String matchingPassword;

   @NotNull
   @NotEmpty
   private String username;


    


    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the matchingEmail
     */
    public String getMatchingEmail() {
        return matchingEmail;
    }

    /**
     * @param matchingEmail the matchingEmail to set
     */
    public void setMatchingEmail(String matchingEmail) {
        this.matchingEmail = matchingEmail;
    }

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return String return the matchingPassword
     */
    public String getMatchingPassword() {
        return matchingPassword;
    }

    /**
     * @param matchingPassword the matchingPassword to set
     */
    public void setMatchingPassword(String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

    /**
     * @return String return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

}
