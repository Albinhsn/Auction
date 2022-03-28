package Auctionista.Entities;

import java.util.Date;


public class Bid {


    
    private int Id;
    private int BidderId;
    private int Bid;
    private Date Time; 

    

    public Bid(int Id, int BidderId, int Bid, Date Time) {
        this.Id = Id;
        this.BidderId = BidderId;
        this.Bid = Bid;
        this.Time = Time;
    }

    public int getId() {
        return this.Id;
    }

    public void setId(int Id) {
        this.Id = Id;
    }

    public int getUserId() {
        return this.BidderId;
    }

    public void setUserId(int BidderId) {
        this.BidderId = BidderId;
    }

    public int getBidAmount() {
        return this.Bid;
    }

    public void setBidAmount(int Bid) {
        this.Bid = Bid;
    }

    public Date getBidTime() {
        return this.Time;
    }

    public void setBidTime(Date Time) {
        this.Time = Time;
    }

}
