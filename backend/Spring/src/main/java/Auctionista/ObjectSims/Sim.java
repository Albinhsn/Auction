package Auctionista.ObjectSims;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class Sim implements CommandLineRunner{
    

    @Autowired
    AuctionSimRepo aucSimRepo;

    Random rand = new Random();


    void simAuctions(){
        
        String[] states = {"Slut", "Pågående"};
        String[] names = {""};
        String[] conditions = {"Perfekt", "Utmärkt", "Hyggligt", "Bra", "Dåligt"};
        
        
        //100 objects
        for(int i = 0; i<100; i++){

            
        }

    }

    

    public void run(String... args){
        simAuctions();

    }
}
