package Auctionista.Entities;

import java.util.List;

public class WatchItem {
    
    private String id;
    private String auctionId;
    private List<String> times;


    public WatchItem(String id, String auctionId, List<String> times) {
        this.id = id;
        this.auctionId = auctionId;
        this.times = times;
    }


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuctionId() {
        return this.auctionId;
    }

    public void setAuctionId(String auctionId) {
        this.auctionId = auctionId;
    }

    public List<String> getTimes() {
        return this.times;
    }

    public void setTimes(List<String> times) {
        this.times = times;
    }

}
