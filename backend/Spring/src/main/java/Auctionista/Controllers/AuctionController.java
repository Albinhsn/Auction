package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import Auctionista.Entities.Auction;
import Auctionista.Services.AuctionService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/auction")
public class AuctionController {
    

    @Autowired
    private AuctionService auctionService;


    @CrossOrigin
    @GetMapping("/state")
    public List<Auction> getAllCurrentAuctions(){
        return auctionService.getAllCurrentAuctions();
    }

    @CrossOrigin
    @GetMapping("/bid/asc")
    public List<Auction> getAuctionsByBidAscLimited(){
        return auctionService.getAuctionsByBidAscLimited();
    }
    
    @CrossOrigin
    @GetMapping("/purchase/asc")
    public List<Auction> getAuctionsByPurchaseAscLimited() {
        return auctionService.getAuctionsByPurchaseAscLimited();
    }

    @CrossOrigin
    @GetMapping("/time/asc")
    public List<Auction> getAuctionsByRemainingTimeAscLimited() {
        return auctionService.getAuctionsByRemainingTimeAscLimited();
    }

    @CrossOrigin
    @GetMapping(value="/objectid")
    public Auction getMethodName(
        @RequestParam String _id) {
        return auctionService.getAuctionByObjectId(_id);
    }
    
}
