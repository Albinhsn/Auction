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
        public void WonAuction(Auction auction)
        {
            
           _emailService.sendWonAuctionEmail(auction);
            
        }

        [HttpPost]
        public void MadeBid(Auction auction)
        {
            _emailService.sendMadeBidEmail(auction);

        }

        [HttpPost]
        public void MadePurchase(Auction auction)
        {
            _emailService.sendPurchaseMadeEmail(auction);

        }

        [HttpPost]
        public void WatchlistBidMade(Auction auction)
        {
            _emailService.sendWatchlistBidMadeEmail(auction);

        }
        [HttpPost]
        public void WatchlistTimeRemaining(Auction auction)
        {
            _emailService.sendWatchlistTimeRemainingMadeEmail(auction);

        }
        [HttpPost]
        public void SoldAuction(Auction auction)
        {
            _emailService.sendSoldAuctionEmail(auction);

        }
    }
}
