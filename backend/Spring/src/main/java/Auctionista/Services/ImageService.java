package Auctionista.Services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import Auctionista.Entities.ImageFile;


import org.apache.commons.io.IOUtils;


@Service
public class ImageService {

    @Autowired
    private GridFsTemplate gridFsTemplate;


    @Autowired
    private GridFsOperations gridFsOperations;
    
    public ImageFile upImageFile(File file) throws IOException{
        InputStream inputStream = new FileInputStream(file);
        
        
        
        
        DBObject metaData = new BasicDBObject();
        metaData.put("user", "me");

        String _id = gridFsTemplate.store(inputStream, "logo.png", "image/png", metaData).toString();
        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(_id)));
        
        ImageFile imageFile = new ImageFile();
        
        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            imageFile.setFilename(gridFSFile.getFilename());

            imageFile.setFileType(gridFSFile.getMetadata().get("_contentType").toString());

            imageFile.setFile(IOUtils.toByteArray(gridFsOperations.getResource(gridFSFile).getInputStream()));
        }

        return imageFile;
    }

    public ImageFile getImage(){
        return null;
    }
}
