package Auctionista.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Auctionista.Annotations.Email.IUserService;
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
        System.out.println("GOT 2\n");
        if (emailExists(userDto.getEmail())) {
            System.out.println("GOT 3\n");
            throw new UserAlreadyExistException("There is an account with that email address: "
                    + userDto.getEmail());
        
        }
        System.out.println("GOT 4\n");
        User user = new User(userDto.getEmail());
        System.out.println("\nAdded user with email " + user.getEmail());
        return userRepo.save(user);
    }

    public boolean emailExists(String email) {
        System.out.println(userRepo.findByEmail(email));
        return userRepo.findByEmail(email) != null;
    }

   
}
