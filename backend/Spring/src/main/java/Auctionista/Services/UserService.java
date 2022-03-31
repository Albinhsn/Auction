package Auctionista.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;
import Auctionista.Entities.WatchItem;
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
        int[] favo = {};
        List<WatchItem> watchlist = new ArrayList<>();
        User user = new User(
            userDto.getUsername(),    
            userDto.getEmail(), 
            userDto.getPassword(), 
            favo,
            watchlist
            );
        return userRepo.save(user);
    }

    public boolean emailExists(String email) {
        return userRepo.findByEmail(email) != null;
    }

    public boolean usernameExists(String username){
        return userRepo.findByUsername(username) != null;
    }
   
}
