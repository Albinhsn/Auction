package Auctionista.Services;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;
import Auctionista.Errors.UserAlreadyExistException;
import Auctionista.Repositories.UserRepo;


@Service
@Transactional
public class UserService implements IUserService{

    @Autowired
    private UserRepo userRepo;
    

    public List<User> getAllUsers(){
        return userRepo.getAllUsers();
    }

    @Override
    public User registerNewUserAccount(UserDto userDto) throws UserAlreadyExistException {
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
            
            user.set_id(new ObjectId().toString());
            
            List<String> favo = new ArrayList<>();
            user.setFavorites(favo);
            List<String> watchlist= new ArrayList<>();
            user.setWatchlist(watchlist);
            userRepo.save(user);
            return user.get_id();
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


}
