package Auctionista.Repositories;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import Auctionista.Dto.AuthenticateUserDto;
import Auctionista.Entities.User;


@Repository
public interface AuthenticationRepo extends MongoRepository<User, String>{
    
    @Aggregation(pipeline = {
        "{'$match': {email: ?0}}",
        "{'$project': {_id: 0, email: 1, password: 1}}"
    })
    AuthenticateUserDto findUserByEmail(String email);
}
