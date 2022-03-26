package Auctionista.Entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("auction")
public class Auction {


    @Id
    private String id;



    private String name;
    private String state;
    private List<Bid> Bidhistory;
    private String condition;
    private String startTime;
    private String stopTIme;
    private int purchasePrice;
    private int minimumBid;
    private int sellerId;
    private int winnerId;
    private String[] images;
    private String description;
    private String auctionType;
    private String[] tags;


    public Auction(String id, String name, String state, List<Bid> Bidhistory, String condition, String startTime, String stopTIme, int purchasePrice, int minimumBid, int sellerId, int winnerId, String[] images, String description, String auctionType, String[] tags) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.Bidhistory = Bidhistory;
        this.condition = condition;
        this.startTime = startTime;
        this.stopTIme = stopTIme;
        this.purchasePrice = purchasePrice;
        this.minimumBid = minimumBid;
        this.sellerId = sellerId;
        this.winnerId = winnerId;
        this.images = images;
        this.description = description;
        this.auctionType = auctionType;
        this.tags = tags;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<Bid> getBidhistory() {
        return this.Bidhistory;
    }

    public void setBidhistory(List<Bid> Bidhistory) {
        this.Bidhistory = Bidhistory;
    }

    public String getCondition() {
        return this.condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getStartTime() {
        return this.startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getStopTIme() {
        return this.stopTIme;
    }

    public void setStopTIme(String stopTIme) {
        this.stopTIme = stopTIme;
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

    public int getSellerId() {
        return this.sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }

    public int getWinnerId() {
        return this.winnerId;
    }

    public void setWinnerId(int winnerId) {
        this.winnerId = winnerId;
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

    public String[] getTags() {
        return this.tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

}