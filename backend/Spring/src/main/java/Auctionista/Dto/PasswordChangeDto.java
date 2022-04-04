package Auctionista.Dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import Auctionista.Annotations.Password.ValidPassword;

@ValidPassword
public class PasswordChangeDto {
    

    @NotEmpty
    @NotNull
    private String password;
    private String matchingPassword;
    
}
