package Auctionista.Dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import Auctionista.Annotations.Email.ValidEmail;

@ValidEmail
public class UserDto {
    
    @NotNull
    @NotEmpty
    private String email;
    private String matchingEmail;

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatchingEmail() {
        return this.matchingEmail;
    }

    public void setMatchingEmail(String matchingEmail) {
        this.matchingEmail = matchingEmail;
    }
}
