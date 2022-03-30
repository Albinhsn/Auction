package Auctionista.Annotations.Username;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import Auctionista.Dto.UserDto;

public class UsernameValidator implements ConstraintValidator<ValidUsername, Object>{
    
    @Override
    public void initialize(ValidUsername constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        return (validatePassword(obj));
    }

    private boolean validatePassword(Object obj) {
        UserDto userDto = (UserDto) obj;
        return userDto.getPassword().equals(userDto.getMatchingPassword());
    }
}
