package Auctionista.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;
import Auctionista.Repositories.UserRepo;


@Service
@Transactional
public class UserService implements IUserService{

    @Autowired
    private UserRepo userRepo;


    @Override
    public User registerNewUserAccount(UserDto userDto) {
        if(usernameExists(userDto.getUsername())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "There is an account with that username");
        }
        if (emailExists(userDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN , "There is an account with that email address");
        }

        
        
        List<String> favo = new ArrayList<>();
        List<String> watchlist = new ArrayList<>();
        User user = new User();
        user.set_id(new ObjectId().toString());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setFavorites(favo);
        user.setWatchlist(watchlist);
            
        return userRepo.save(user);
    }
    
    
    public String validateLogin(String email, String password){
        String id = userRepo.validateLogin(email, password);
        if(id == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid login");
        }
        return id;
    }

    public boolean emailExists(String email) {
        return userRepo.findByEmail(email) != null;
    }

    public boolean usernameExists(String username){
        return userRepo.findByUsername(username) != null;
    }

    public String handleGoogleLogin(User user){
        User locUser = userRepo.findByEmail(user.getEmail());
        if(locUser == null){
            
            List<String> favo = new ArrayList<>();
            user.setFavorites(favo);

            List<String> watchlist= new ArrayList<>();
            user.setWatchlist(watchlist);

            return userRepo.save(user).get_id();
        }

        return locUser.get_id();
    }
    
    public String getUsernameFromObjectId(String _id){
        return userRepo.getUsernameFromObjectId(_id);
    }


    public boolean checkFavorite(String userId, String auctionId){
        User user = userRepo.getUserFromObjectId(userId);    
        
        if(user.getFavorites().contains(auctionId)){
            return true;
        }
        return false;
    }

    public void updateFavorite(String userId, String auctionId){
        User u = userRepo.updateFavorite(userId, auctionId);

        userRepo.save(u);
    }
    public void updateWatchlist(String userId, String auctionId){
        User u = userRepo.updateWatchlist(userId, auctionId);
        userRepo.save(u);
    }

    public User getUserFromObjectId(String userId){
        return userRepo.getUserFromObjectId(userId);
    }

    public User getUserFromEmail(String email){
        return userRepo.getUserFromEmail(email);
    }


    public User changeEmail(String userId, String email, String matchingEmail){

        validateEmail(email, matchingEmail);
        if(emailExists(email)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Ett konto finns redan med den angivna email adressen");
        }
        
        User user = userRepo.getUserFromObjectId(userId);
        user.setEmail(email);
        return userRepo.save(user);

    }

    public void validateEmail(String email, String matchingEmail){
        String EMAIL_PATTERN = "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@"
        + "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$";
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher = pattern.matcher(email);
        if(!email.equals(matchingEmail)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Emails don't match");
        }
        if(!matcher.matches()){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not a valid email");
        }
        
    }
    
    public User changePassword(String userId, String password, String matchingPassword){
        validatePassword(password, matchingPassword);
        User user = userRepo.getUserFromObjectId(userId);
        user.setPassword(password);
        return userRepo.save(user);
    }

    public void validatePassword(String password, String matchingPassword){
        if(!password.equals(matchingPassword)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Passwords doesn't match");
        }
    }
    public String getObjectIdFromEmail(String email){
        return userRepo.getObjectIdFromEmail(email);
    }
}
