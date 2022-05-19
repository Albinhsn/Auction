﻿using AuctionMicroService.Models;
using AuctionMicroService.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace AuctionMicroService.Controllers
{
    [ApiController]
    [Route("/api/auction/[controller]")]
    public class AuctionController : ControllerBase
    {

        AuctionService _auctionService;

        public AuctionController(AuctionService auctionService)
        {
            _auctionService = auctionService;
        }        

        [HttpGet]
        public List<Auction> GetAll()
        {
            return _auctionService.GetAll().Result;
        }


        [HttpPost]
        public IActionResult PostAuction([FromBody] AuctionPostModel auc)
        {
            try
            {
                //AuctionHelpers.ValidateAuction c:
                _auctionService.CreateAuction(auc);
            } catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }

            return Ok("Created Auction");
        }
        [HttpGet("/api/[controller]/single/auction")]
        public async Task<Auction> getAuction(string id)
        {
            return await _auctionService.GetAuction(new ObjectId(id));
        }


        [HttpPut("/api/[controller]/update")]
        public async Task<Auction> UpdateAuction( Auction auc, string Id)
        {
            return await _auctionService.UpdateAuction(auc, Id);
        }

        [HttpGet("/api/auction/[controller]/sorted/limited")]
        public List<Auction> GetAuctionsSortedLimited([FromQuery] string sort, [FromQuery] int direction, [FromQuery] int limitedBy)
        {
            
            return _auctionService.GetAuctionsSortedLimited(sort, direction, limitedBy);
        }

        [HttpPut("/api/[controller]/purchase")]
        public void MadePurchase(string userId, string auctionId)
        {
            _auctionService.MadePurchase(userId, auctionId);
        }
    }
}
