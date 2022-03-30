package Auctionista.Annotations.Email;

import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;

public interface IUserService {

    User registerNewUserAccount(UserDto userDto);
}
