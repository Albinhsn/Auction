package Auctionista.Annotations.Email;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import Auctionista.Dto.UserDto;

public class EmailValidator implements ConstraintValidator<ValidEmail, Object>{
    
    private Pattern pattern;
    private Matcher matcher;
    private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$";

    @Override
    public void initialize(ValidEmail constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        return (validateEmail(obj));
    }

    private boolean validateEmail(Object obj) {
        UserDto userDto = (UserDto) obj;
        
        pattern = Pattern.compile(EMAIL_PATTERN);
        matcher = pattern.matcher(userDto.getEmail());
        return (matcher.matches() && userDto.getEmail().equals(userDto.getMatchingEmail()));
    }
}
