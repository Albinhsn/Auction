package Auctionista.Entities;

import java.util.Date;


public class Bid {


    
    private String _id;
    private String bidderId;
    private int bid;
    private Date time; 


    

    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getBidderId() {
        return this.bidderId;
    }

    public void setBidderId(String bidderId) {
        this.bidderId = bidderId;
    }

    public int getBid() {
        return this.bid;
    }

    public void setBid(int bid) {
        this.bid = bid;
    }

    public Date getTime() {
        return this.time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
    

}