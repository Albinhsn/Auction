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
import org.springframework.web.multipart.MultipartFile;

import Auctionista.Entities.ImageFile;


import org.apache.commons.io.IOUtils;


@Service
public class ImageService {

    @Autowired
    private GridFsTemplate gridFsTemplate;


    @Autowired
    private GridFsOperations gridFsOperations;
    
    public String uploadImage(MultipartFile file) throws IOException{
        
        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", file.getSize());
        gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metadata).toString();
        return file.getOriginalFilename();
    }

    public ImageFile getImageByName(String fileName) throws IOException{
        
        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("filename").is(fileName)));
        ImageFile imageFile = new ImageFile();
        
        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            imageFile.setFilename(gridFSFile.getFilename());

            imageFile.setFileType(gridFSFile.getMetadata().get("_contentType").toString());

            imageFile.setFile(IOUtils.toByteArray(gridFsOperations.getResource(gridFSFile).getInputStream()));
        }
        return imageFile;
    }
    public boolean deleteImage(){

        return true;
    }
}
