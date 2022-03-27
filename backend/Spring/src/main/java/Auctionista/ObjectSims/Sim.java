package Auctionista.ObjectSims;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class Sim implements CommandLineRunner{
    

    @Autowired
    AuctionSimRepo aucSimRepo;

    Random rand = new Random();


    void simAuctions(){
        
        String[] states = {"Slut", "Pågående"};
        String[] names = {"Sony A7R III A Body", "Canon EOS R6", "Sony ZV E10L", "Canon EOS m50 Mark II", "Canon EOS R", "Sony A7 III", "Canon EOS 90D", "Fujifilm X-T3", "Canon EOS R5", "Nikon Z6 II", "Canon IXUS 185", "Panasonic Lumix DC-TZ200",
        "Nikon Coolpix P950", "Panasonic LX100 II", "Nikon Coolpix P1000", "Olympus Tough TG-6", "Fujifilm X100V", "Canon PowerShot G7 X III", "Canon PowerShotSX70 HS", "Canon PowerShot SX430 IS", "Sony CyberShot DSC-RX100",
        "Fujifilm GFX100s"
    };
        List<String[]> tags = new ArrayList<String[]>();
        //Märke, Typ av kamera, Objektivfattning, Bildsensorstorlek, Upplösning, Vädertätad, Max internt videoformat, Minneskort, Trådlös anslutning, Vinklingsbar skärm
        tags.add(new String[] {"Sony", "Systemkamera", "Sony E", "24x36", "42.4", "Nej", "4k 30fps"});
        tags.add(new String[] { "Canon", "Systemkamera", "Canon RF", "24x36", "20.1", "Ja", "4k 60fps" });
        tags.add(new String[] { "Sony", "Systemkamera", "Sony E", "APS-C", "24.2", "", "4k 30fps" });
        tags.add(new String[] { "Canon", "Systemkamera", "Canon EOS M", "APS-C", "24.1", "Nej", "4k 24fps" });
        tags.add(new String[] { "Canon", "Systemkamera", "Canon RF", "24x36", "30.3", "Ja", "4k 30fps" });
        tags.add(new String[] { "Sony", "Systemkamera", "Sony E", "24x36", "24.2", "Ja", "4k 30fps" });
        tags.add(new String[] { "Canon", "Systemkamera", "Canon EF", "APS-C", "32.5", "Ja", "4k 30fps" });
        tags.add(new String[] { "Fujifilm", "Systemkamera", "Fuji X", "24x36", "26", "Ja", "4k 60fps" });
        tags.add(new String[] { "Canon", "Systemkamera", "Canon RF", "24x36", "45", "Ja", "8k 30fps" });
        tags.add(new String[] { "Nikon", "Systemkamera", "Nikon Z", "24x36", "24.5", "Ja", "4k 30fps" });
        tags.add(new String[] { "Canon", "Kompaktkamera", "", "2,3'", "20", "Nej", "0" });
        tags.add(new String[] { "Panasonic", "Kompaktkamera", "", "2,3'", "20.1", "Nej", "4k 30fps" });
        tags.add(new String[] { "Nikon", "Kompaktkamera", "", "2,3'", "16", "Nej", "4k 30fps" });
        tags.add(new String[] { "Panasonic", "Kompaktkamera", "", "High Sens MOS", "17", "Nej", "4k 30fps" });
        tags.add(new String[] { "Nikon", "Kompaktkamera", "", "2,3'", "16", "Nej", "4k 30fps" });
        tags.add(new String[] { "Olympus", "Kompaktkamera", "", "2,3'", "12", "Ja", "4k 30fps" });
        tags.add(new String[] { "Fujifilm", "Kompaktkamera", "", "APS-C", "26.1", "Ja", "4k 30fps" });
        tags.add(new String[] { "Canon", "Kompaktkamera", "", "1'", "20.1", "Nej", "4k 30fps" });
        tags.add(new String[] { "Canon", "Kompaktkamera", "", "2.3'", "20.3", "Nej", "4k 30fps" });
        tags.add(new String[] { "Canon", "Kompaktkamera", "", "2.3'", "20.5", "Nej", "" });
        tags.add(new String[] { "Sony", "Kompaktkamera", "", "1'", "20.1", "Nej", "4k 30fps"});
        tags.add(new String[] { "Fujifilm", "Mellanformatskamera", "Fuji GF", "43.8x32,9", "102", "Ja", "4k 30fps" });
        String[] conditions = {"Perfekt", "Utmärkt", "Hyggligt", "Bra", "Dåligt"};
        

        
        //100 objects
        for(int i = 0; i<100; i++){

            
        }

    }

    

    public void run(String... args){
        simAuctions();

    }
}
