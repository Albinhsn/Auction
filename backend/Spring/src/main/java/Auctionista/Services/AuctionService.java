package Auctionista.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Auctionista.Entities.Auction;
import Auctionista.Repositories.AuctionRepo;



@Service
public class AuctionService {

    @Autowired
    private AuctionRepo auctionRepo;
    

    public List<Auction> getAllCurrentAuctions(){
        return auctionRepo.getAllCurrentAuctions();
    }
    
    public Auction save(Auction auction){
        return auctionRepo.save(auction);
    }

}
