package Auctionista.Annotations.Password;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import Auctionista.Dto.UserDto;

public class PasswordValidator implements ConstraintValidator<ValidPassword, Object> {


   

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
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
