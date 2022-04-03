package Auctionista.Entities;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("auctions")
public class Auction {


    @Id
    private String _id;

    private String name;
    private String state;
    private List<Bid> bidHistory;
    private String condition;
    private int purchasePrice;
    private int minimumBid;
    private String seller;
    private String winner;
    private String[] images;
    private String description;
    private String auctionType;
    private Tags tags;
    private Date startDate;
    private Date endDate;
    private int highestBid;




    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<Bid> getBidHistory() {
        return this.bidHistory;
    }

    public void setBidHistory(List<Bid> bidHistory) {
        this.bidHistory = bidHistory;
    }

    public String getCondition() {
        return this.condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public int getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchasePrice(int purchasePrice) {
        this.purchasePrice = purchasePrice;
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

    public String getWinner() {
        return this.winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String[] getImages() {
        return this.images;
    }

    public void setImages(String[] images) {
        this.images = images;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuctionType() {
        return this.auctionType;
    }

    public void setAuctionType(String auctionType) {
        this.auctionType = auctionType;
    }

    public Tags getTags() {
        return this.tags;
    }

    public void setTags(Tags tags) {
        this.tags = tags;
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

    public int getHighestBid() {
        return this.highestBid;
    }

    public void setHighestBid(int highestBid) {
        this.highestBid = highestBid;
    }

    
    
    



}
