package Auctionista.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import Auctionista.Entities.Auction;

@Repository
public interface AuctionRepo extends MongoRepository<Auction, String>{
    
    
    
    @Query(value="{State:'Pågående'}")
    List<Auction> getAllCurrentAuctions();


    
}
