package Auctionista.Annotations.Email;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

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
        System.out.println(userDto.getEmail() + "\n");
        System.out.println(userDto.getMatchingEmail() + "\n");
        matcher = pattern.matcher(userDto.getEmail());
        if(!userDto.getEmail().equals(userDto.getMatchingEmail())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Emails don't match");
        }
        if(!matcher.matches()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not a valid email");
        }
        return true;
    }
}
