package Auctionista.Services;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Auctionista.Dto.AuctionDto;
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

    public String postAuction(AuctionDto auctionDto){
        Auction auc = createAuctionFromDto(auctionDto);
        return auctionRepo.save(auc).get_id();
    }

    public Auction createAuctionFromDto(AuctionDto auctionDto){
        Auction auc = new Auction();
        auc.setName(auctionDto.getName());
        auc.setAuctionType(auctionDto.getAuctionType());
        auc.setBidHistory(auctionDto.getBidHistory());
        auc.setCondition(auctionDto.getCondition());
        auc.setDescription(auctionDto.getDescription());
        auc.setEndDate(auctionDto.getEndDate());
        auc.setStartDate(auctionDto.getStartDate());
        auc.setImages(auctionDto.getImages());
        auc.setMinimumBid(auctionDto.getMinimumBid());
        auc.setPurchasePrice(auctionDto.getPurchasePrice());
        auc.setSeller(auctionDto.getSeller());
        auc.setState(auctionDto.getState());
        auc.setTags(auctionDto.getTags());
        auc.setWinner(auctionDto.getWinner());   
        
        //Reformat images
        List<String> images = Arrays.asList(auctionDto.getImages());
        for(int i = 0; i<images.size(); i++){
            images.set(i, images.get(i).replace("http://localhost:8000/images/image/", ""));
        }
        auc.setImages(images.toArray(new String[0]));
        
        return auc;
        
    }

    public List<Auction> getWatchlistById(String userId){
        System.out.println(userId);
        return auctionRepo.getWatchlistById(userId);
    }
    
}
