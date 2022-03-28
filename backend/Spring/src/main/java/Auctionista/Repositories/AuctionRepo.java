package Auctionista.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import Auctionista.Entities.Auction;

public interface AuctionRepo extends MongoRepository<Auction, String>{
    
    
    
    @Query(value="{State:'?0'}")
    List<Auction> findAllState(String State);


    public long count();
}
