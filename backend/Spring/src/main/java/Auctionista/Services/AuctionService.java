package Auctionista.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
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

    public List<Auction> getAuctionsByBidAscLimited(){
        return auctionRepo.getAuctionsByBidAscLimited();
    }

    public List<Auction> getAuctionsByPurchaseAscLimited() {
        return auctionRepo.getAuctionsByPurchaseAscLimited();
    }

    public List<Auction> getAuctionsByRemainingTimeAscLimited() {
        return auctionRepo.getAuctionsByRemainingTimeAscLimited();
    }

    public Auction getAuctionByObjectId(String _id){
        Auction auc = auctionRepo.getAuctionByObjectId(_id);
        return auc;
    }

    public Auction makeBid(int bid, String userId, String auctionId){
        Date date = new Date();
        String bidId = new ObjectId().toHexString();
        Auction auction = auctionRepo.makeBid(auctionId, bidId, userId, bid,  date);
        auctionRepo.save(auction);
        return auction;
    }

    public Auction makePurchase(String userId, String auctionId){
        Date date = new Date();
        Auction auction = auctionRepo.makePurchase(auctionId, userId, date);
        auctionRepo.save(auction);
        return auction;

    }

    public List<Auction> getFavoritesById(String authId){
        return auctionRepo.getFavoritesById(authId);
    }

    public List<Auction> getUserAuctions(String userId){
        return auctionRepo.getUserAuctions(userId);
    }

    public List<Auction> getAuctionsBySearch(String search){
        return auctionRepo.getAuctionsBySearch(search);

        
    }
}
