package Auctionista.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("bid")
public class Bid {
    
    @Id
    private String id;

    private String userId;
    private int bidAmount;
    private String bidTime; 

    

    public Bid(String id, String userId, int bidAmount, String bidTime) {
        this.id = id;
        this.userId = userId;
        this.bidAmount = bidAmount;
        this.bidTime = bidTime;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getBidAmount() {
        return this.bidAmount;
    }

    public void setBidAmount(int bidAmount) {
        this.bidAmount = bidAmount;
    }

    public String getBidTime() {
        return this.bidTime;
    }

    public void setBidTime(String bidTime) {
        this.bidTime = bidTime;
    }

}
