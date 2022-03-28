package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import Auctionista.Entities.Auction;
import Auctionista.Services.AuctionService;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auction")
public class AuctionController {
    

    @Autowired
    private AuctionService auctionService;

    @GetMapping("/state")
    public List<Auction> getAllCurrentAuctions(){
        return auctionService.getAllCurrentAuctions();
    }
}
