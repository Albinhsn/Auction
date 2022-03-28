package Auctionista.Entities;

public class Tags {
    

    private String Brand;
    private String Type;
    private String Lens;
    private String ImageSensorSize;
    private String Resolution;
    private String WeatherProof;
    private String VideoFormat;
    private String[] MemoryCards;
    private String[] WirelessConnection;
    private String AngledScreen;



    public Tags(String Brand, String Type, String Lens, String ImageSensorSize, String Resolution, String WeatherProof, String VideoFormat, String[] MemoryCards, String[] WirelessConnection, String AngledScreen) {
        this.Brand = Brand;
        this.Type = Type;
        this.Lens = Lens;
        this.ImageSensorSize = ImageSensorSize;
        this.Resolution = Resolution;
        this.WeatherProof = WeatherProof;
        this.VideoFormat = VideoFormat;
        this.MemoryCards = MemoryCards;
        this.WirelessConnection = WirelessConnection;
        this.AngledScreen = AngledScreen;
    }


    public String getBrand() {
        return this.Brand;
    }

    public void setBrand(String Brand) {
        this.Brand = Brand;
    }

    public String getType() {
        return this.Type;
    }

    public void setType(String Type) {
        this.Type = Type;
    }

    public String getLens() {
        return this.Lens;
    }

    public void setLens(String Lens) {
        this.Lens = Lens;
    }

    public String getImageSensorSize() {
        return this.ImageSensorSize;
    }

    public void setImageSensorSize(String ImageSensorSize) {
        this.ImageSensorSize = ImageSensorSize;
    }

    public String getResolution() {
        return this.Resolution;
    }

    public void setResolution(String Resolution) {
        this.Resolution = Resolution;
    }

    public String getWeatherProof() {
        return this.WeatherProof;
    }

    public void setWeatherProof(String WeatherProof) {
        this.WeatherProof = WeatherProof;
    }

    public String getVideoFormat() {
        return this.VideoFormat;
    }

    public void setVideoFormat(String VideoFormat) {
        this.VideoFormat = VideoFormat;
    }

    public String[] getMemoryCards() {
        return this.MemoryCards;
    }

    public void setMemoryCards(String[] MemoryCards) {
        this.MemoryCards = MemoryCards;
    }

    public String[] getWirelessConnection() {
        return this.WirelessConnection;
    }

    public void setWirelessConnection(String[] WirelessConnection) {
        this.WirelessConnection = WirelessConnection;
    }

    public String getAngledScreen() {
        return this.AngledScreen;
    }

    public void setAngledScreen(String AngledScreen) {
        this.AngledScreen = AngledScreen;
    }

}
