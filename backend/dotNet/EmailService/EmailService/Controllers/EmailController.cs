using EmailService.EmailConfig;
using Microsoft.AspNetCore.Mvc;


namespace EmailService.Controllers
{

    [ApiController]
    [Route("/api/email/[controller]")]
    public class EmailController : ControllerBase
    {

        private readonly EmailService _emailService;

        public EmailController(EmailService emailService) =>
            _emailService = emailService;

        [HttpPost]
        public void wonAuction(Auction auction)
        {
            
           _emailService.sendWonAuctionEmail(auction);
            
        }

        [HttpPost]
        public void madeBid(Auction auction)
        {
            _emailService.sendMadeBidEmail(auction);

        }

        [HttpPost]
        public void madePurchase(Auction auction)
        {
            _emailService.sendPurchaseMadeEmail(auction);

        }

        [HttpPost]
        public void watchlistBidMade(Auction auction)
        {
            _emailService.sendWatchlistBidMadeEmail(auction);

        }
        [HttpPost]
        public void watchlistTimeRemaining(Auction auction)
        {
            _emailService.sendWatchlistTimeRemainingMadeEmail(auction);

        }
        [HttpPost]
        public void soldAuction(Auction auction)
        {
            _emailService.sendSoldAuctionEmail(auction);

        }
    }
}
