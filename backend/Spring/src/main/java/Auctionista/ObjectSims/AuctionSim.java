package Auctionista.ObjectSims;

import java.util.List;
import Auctionista.Entities.Auction;
import Auctionista.Entities.Bid;

public class AuctionSim {
    

    


    
    private String id = "";
    private String name = "";
    private List<Bid> bidHistory;
    private String state = "";
    private String condition = "";
    private String startTime = "";
    private String stopTime = "";
    private int purchasePrice = 0;
    private int minimumBid = 0;
    private int sellerId = 1;
    private int winnerId = 1;
    private String[] images;
    private String description = "";
    private String auctionType = "";
    private String[] tags;    

    Auction auc = new Auction(
        this.id,
        this.name, 
        this.state, 
        this.bidHistory, 
        this.condition, 
        this.startTime,
        this.stopTime,
        this.purchasePrice,
        this.minimumBid,
        this.sellerId,
        this.winnerId,
        this.images,
        this.description,
        this.auctionType,
        this.tags
        );
    


}
