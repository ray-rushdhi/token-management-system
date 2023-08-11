package com.hSenid.demo.services;

import com.hSenid.demo.models.DBSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class TokenSequenceGenerator {

    @Autowired
    private MongoOperations mongoOperations;

    public int getSequenceNumber(String sequenceName){
        //get sequence number
        Query query = new Query(Criteria.where("id").is(sequenceName));
        //update the sequence no
        Update update = new Update().inc("seq", 1);
        //update the document
        DBSequence counter = mongoOperations.findAndModify(
                query,
                update,
                new FindAndModifyOptions().returnNew(true).upsert(true),
                DBSequence.class
        );

        return !Objects.isNull(counter)? counter.getSeq():1;
    }
}
