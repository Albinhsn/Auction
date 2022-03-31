package Auctionista.Annotations.Password;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import Auctionista.Dto.UserDto;

public class PasswordValidator implements ConstraintValidator<ValidPassword, Object> {


   

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        if(!validatePassword(obj)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Passwords doesn't match");
        }
        return true;
    }

    private boolean validatePassword(Object obj) {
        UserDto userDto = (UserDto) obj;
        return userDto.getPassword().equals(userDto.getMatchingPassword());
    }
    
}
