package Auctionista.Services;

import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;

public interface IUserService {

    User registerNewUserAccount(UserDto userDto);
}
