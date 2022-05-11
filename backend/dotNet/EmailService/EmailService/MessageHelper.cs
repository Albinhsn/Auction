namespace EmailService
{
    public class MessageHelper
    {

        public Message createWonAuctionMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"Vunnen auktion av {auction.AuctionName}",
                $"Grattis!\nDu vann auktionen av '{auction.AuctionName}' för {auction.Price}kr"
                );
        }

        public Message createMadeBidMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"Du la ett bud på {auction.AuctionName}",
                $"Du la ett bud på auktionen '{auction.AuctionName}' för {auction.Price}kr"
                );
        }
        public Message createMadePurchaseMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"Du köpte {auction.AuctionName}",
                $"Du köpte ut auktionen '{auction.AuctionName}' för {auction.Price}kr"
                );
        }
        public Message createSoldAuctionMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"Såld auktion: {auction.AuctionName}",
                $"Din auktion: '{auction.AuctionName}' blev precis såld för {auction.Price}kr"
                );
        }
        public Message createWatchlistTimeRemainingMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"2h kvar av: {auction.AuctionName}",
                $"Auktionen '{auction.AuctionName}' har nu 2 timmar kvar och högsta budet är {auction.Price}kr"
                );
        }
        public Message createWatchlistBidMadeMessage(Auction auction)
        {
            return new Message(
                new String[]
                {auction.Email},
                $"Bud lagt på {auction.AuctionName}",
                $"Auktionen '{auction.AuctionName}' fick nu ett högsta bud av {auction.Price}kr"
                );
        }

    }

}
