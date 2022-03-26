package Auctionista.ObjectSims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuctionSimRepo extends MongoRepository<AuctionSim, String>{
    
    
}
