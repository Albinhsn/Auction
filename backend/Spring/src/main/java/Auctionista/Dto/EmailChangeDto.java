package Auctionista.Dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import Auctionista.Annotations.Email.ValidEmail;

@ValidEmail
public class EmailChangeDto {
    
    @NotNull
    @NotEmpty
    private String email;
    private String matchingEmail;



    

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

}
