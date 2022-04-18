package Auctionista.Dto;


import java.util.Date;
import java.util.List;

import Auctionista.Annotations.Auction.ValidAuction;
import Auctionista.Entities.Bid;
import Auctionista.Entities.Tags;


@ValidAuction
public class AuctionDto {
    
    private String name;
    private Tags tags;
    private String[] images;
    private String condition;
    private String auctionType;
    private String description;
    private int minimumBid;
    private String seller;
    private List<Bid> bidHistory;
    private String state;
    private String winner;
    private int purchasePrice;
    private Date startDate;
    private Date endDate;




    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tags getTags() {
        return this.tags;
    }

    public void setTags(Tags tags) {
        this.tags = tags;
    }

    public String[] getImages() {
        return this.images;
    }

    public void setImages(String[] images) {
        this.images = images;
    }

    public String getCondition() {
        return this.condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getAuctionType() {
        return this.auctionType;
    }

    public void setAuctionType(String auctionType) {
        this.auctionType = auctionType;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMinimumBid() {
        return this.minimumBid;
    }

    public void setMinimumBid(int minimumBid) {
        this.minimumBid = minimumBid;
    }

    public String getSeller() {
        return this.seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public List<Bid> getBidHistory() {
        return this.bidHistory;
    }

    public void setBidHistory(List<Bid> bidHistory) {
        this.bidHistory = bidHistory;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getWinner() {
        return this.winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public int getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchasePrice(int purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    

}
