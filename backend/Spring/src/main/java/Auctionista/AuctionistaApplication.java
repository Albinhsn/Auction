package Auctionista;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import Auctionista.Entities.Auction;
import Auctionista.Repositories.AuctionRepo;
import Auctionista.Repositories.UserRepo;

@SpringBootApplication
public class AuctionistaApplication implements CommandLineRunner{



	@Autowired
	AuctionRepo auctionRepo;

	@Autowired
	UserRepo userRepo;

	public static void main(String[] args) {
		SpringApplication.run(AuctionistaApplication.class, args);
	}


	public void showAllCurrent(){
		List<Auction> list = auctionRepo.findAllState("Pågående");
		
		list.forEach(item -> System.out.println("GOT"));
	}

	public void run(String... args){
		showAllCurrent();
	}
}
