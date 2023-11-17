const { query } = require('express');
let configuration = require('./config.js'); // Import Configs Class

const checkListRouter = configuration.express.Router();

checkListRouter.get('/checklist/retrieve',(req,res)=>{
  let courseName = req.query.courseName;
  let query = `SELECT DISTINCT
          checklist.checkListID,
          checklist.topic,
          course.courseName,
          checklist.courseID,
          checklist.visibility,
          checklist.deadline,
          checklistitems.checkListItemID,
          checklistitems.checkListItem
        FROM
          course
        JOIN
          checklist ON course.courseID = checklist.courseID
        JOIN
          checklistitems ON checklist.checkListID = checklistitems.checkListID
        WHERE
          course.courseName = ?`;  

          
  if(courseName === undefined){
    res.send("No course name provided");
  }else{
    configuration.connection.query(query,[courseName],(err,result)=>{
      if(err){res.json({success:false , err})}
      else{
        let last_topic ="";
        let send_data = [];// Array of data objects
        for(let row of result){
          // Done to not go over a topic again
          if(row.topic === last_topic ){
            continue;
          }else{
            last_topic = row.topic;
          }
         
          let items_array = []; // Array to hold items
          for(let i =0; i < result.length ;i++){
              if(result[i].topic == row.topic)
                items_array.push(result[i].checkListItem);
          }
          let data = {topic:row.topic ,items : items_array,deadline :row.deadline ,visibility: row.visibility};
          send_data.push(data);
        }
        res.json(JSON.parse(JSON.stringify(send_data)));

      }
    });
  }
});

checkListRouter.get('/courses',(req,res)=>{
  let query = `SELECT *
        FROM
          course`;  

  
  configuration.connection.query(query,(err,result)=>{
    if(err){res.json({success:false , err})}
    else{
      let send_data = [];// Array of data objects
      for(let row of result){

        send_data.push(row.courseName);
      }
      res.json(JSON.parse(JSON.stringify(send_data)));

    }
  });
});

checkListRouter.get('/checklist/getQuestions',(req,res)=>{

  let courseName = req.query.courseName;
  let query = `SELECT DISTINCT
          checklist.checkListID,
          checklist.topic,
          course.courseName,
          checklist.courseID,
          checklist.visibility,
          checklist.deadline,
          checklistitems.checkListItemID,
          checklistitems.checkListItem
        FROM
          course
        JOIN
          checklist ON course.courseID = checklist.courseID
        JOIN
          checklistitems ON checklist.checkListID = checklistitems.checkListID
        WHERE
          course.courseName = ?`;  

          
  if(courseName === undefined){
    res.send("No course name provided");
  }else{
    configuration.connection.query(query,[courseName],(err,result)=>{
      if(err){res.json({success:false , err})}
      else{
        let last_topic ="";
        let send_data = [];// Array of data objects
        for(let row of result){
          // Done to not go over a topic again
          if(row.topic === last_topic ){
            continue;
          }else{
            last_topic = row.topic;
          }
         
          let items_array = []; // Array to hold items
          for(let i =0; i < result.length ;i++){
              if(result[i].topic == row.topic){
                let item = {question : result[i].checkListItem, questionId: result[i].checkListItemID}
                items_array.push(item);
              }
          }
          let data = {topic:row.topic ,items : items_array,deadline :row.deadline ,visibility: row.visibility};
          send_data.push(data);
        }
        res.json(JSON.parse(JSON.stringify(send_data)));

      }
    });
  }
});

checkListRouter.get('/checklist/completed_lists',(req,res)=>{
  let studentNumber = req.query.studentNumber;
  let query = `SELECT DISTINCT
          completedchecklist.checkListID,
          checklist.topic,
          course.courseName,
          checklist.courseID,
          completedchecklist.studentID
        FROM
          completedchecklist
        JOIN
          checklist ON checklist.checkListID = completedchecklist.checkListID
        JOIN
          course ON completedchecklist.courseID = course.courseID    
        WHERE
          completedchecklist.studentID = (SELECT studentID FROM students WHERE studentNumber=?)`; 

  configuration.connection.query(query,[studentNumber],(err,response)=>{
    if(err){
      console.error(err);
      res.json({err});
    }else{
      console.log(response);
      res.json({response})
    }
  })
});
checkListRouter.post('/checklist/insert',(req,res)=>{

  let courseName = req.body.courseName;   
  let topic      =  req.body.topic;
  let deadline   = req.body.deadline;
  let visibility = req.body.visibility;
  let items      = req.body.items;  

  // TODO NO LONGER DELETING
  let cond_query = `SELECT COUNT(topic) FROM checklist WHERE topic=?`;

  configuration.connection.query(cond_query,[topic],(err,rows)=>{
    if (err) {
      res.json({err});
    }
    else{
        console.log(rows[0]["COUNT(topic)"]);
      if(rows[0]["COUNT(topic)"] != 0 ){
        configuration.connection.query("DELETE FROM checklistitems WHERE checkListID= (SELECT checkListID FROM checklist WHERE topic = ?)",[topic],(err,rows)=>{
          if(err) {
            console.log(err);
            res.json({err});
        }else{
        console.log("Hello World");
            // Insert Items into Database
            for(const item of items){
              let query = 'INSERT INTO checklistitems(checkListID , checkListItem) VALUES((SELECT checkListID FROM checklist WHERE topic=?),?) ON DUPLICATE KEY UPDATE checkListItem = checkListItem';
              configuration.connection.query(query,[topic,item],(err,results)=>{
                if(err) res.send({err});// Stop execution if an error occurs
              });
            }
        }
      })
      }
      else{
    let query = 'INSERT INTO checklist (topic, courseID, visibility, deadline) VALUES (?, (SELECT courseID FROM course WHERE courseName = ?), ?, ?) ON DUPLICATE KEY UPDATE topic = topic';

    configuration.connection.getConnection((err,con)=>{
        // Insert new checklist in table
        con.query(query,[topic, courseName, visibility, deadline],(err,rows)=>{
          if(err){
            res.json({
              success : false, err,r : req.body.length});
            }
            else{
              query  = 'select LAST_INSERT_ID() as new_checklist_id';
              con.query(query,(err,rows)=>{
                if(err) res.json({
                  success: false,err
                });
                else {
                  let new_checklist = rows[0].new_checklist_id;
                  console.log("Newly inserted checklist id :", new_checklist);
                  // Insert Items into Database
                  for(const item of items){
                    query = 'INSERT INTO checklistitems(checkListID , checkListItem) VALUES(?,?) ON DUPLICATE KEY UPDATE checkListItem = checkListItem';
                    con.query(query,[new_checklist,item],(err,results)=>{
                      if(err) res.send({err});// Stop execution if an error occurs
                    });
                  }

                  res.json({success:true ,message :"Items inserted successfully"});
                }
              })
            }
        });
    });
      }
    }


  });

 
});


checkListRouter.get('/checklist/insertAnswer',(req,res)=>{

  let itemsAnswer = req.query.items;
  let outcome = req.query.outcome;
  let comment = req.query.comment;
  let topic = req.query.topic;
  let studentNumber = req.query.studentNumber; 
  let courseName = req.query.courseName;

// Send answers to outcomes table 

  // for (const answer of itemsAnswer){
    let query1 = 'INSERT INTO outcomes(outcome, checkListItemID, studentID) VALUES(?, (SELECT checkListItemID FROM checklistitems WHERE checkListItemID = ?), (SELECT studentID FROM students WHERE studentNumber = ?))';
    configuration.connection.getConnection((err,con)=>{
        // Insert new checklist in table
        con.query(query1,[outcome, itemsAnswer, studentNumber],(err,rows)=>{
          if(err){
            res.json({
              success : false, err,r : req.body.length});
            }
        });
    });
  // }

  // sending comments to comment table
  let query = "INSERT INTO comment(checkListID, comment) VALUES ((SELECT checkListID FROM checklist WHERE topic = ?), ?)";
  configuration.connection.getConnection((err,con)=>{
    // Insert new checklist in table
    con.query(query,[topic, comment],(err,rows)=>{
      if(err){
        res.json({
          success : false, err,r : req.body.length});
        }
    });
  });

  // updating the completed table
  console.log('complpete');
  let completed = "INSERT INTO completedchecklist (checkListID, studentID, courseID) VALUES ((SELECT checkListID FROM checklist WHERE topic = ?), (SELECT studentID FROM students WHERE studentNumber = ?), (SELECT courseID FROM course WHERE courseName = ?))";
  configuration.connection.getConnection((err,con)=>{
    con.query(completed,[topic, studentNumber, courseName],(err,rows)=>{
      // console.log('entered');
      if(err){
        console.error(err);
        
        res.json({
          success : false, err,r : req.body.length});
          console.log(rows);
        }
      else{
          res.json({success:true ,message :"Items inserted successfully"});
          // console.log("completed" + rows);
        }
    });
  });
});

checkListRouter.post('/checklist/visibility',(req,res)=>{
  let visibility = req.body.visibility;
  let courseName = req.body.courseName;
  let topic = req.body.topic;

  let query = `UPDATE checklist SET visibility=? WHERE courseID=(SELECT courseID FROM course WHERE courseName = ?) AND topic = ?`;

  configuration.connection.query(query,[visibility,courseName,topic],(err,result)=>{
    if(err){
      console.error(err);
      res.json({err});
    }else{
      res.json({success:true , result});
    }
  });
});

checkListRouter.get('/checklist/completed',(req, res)=>{
    let studentNumber = req.query.studentNumber;
    let courseName = req.query.courseName;
    let checkListTopic = req.query.topic;

    /**
     * Update database using stored procedure
     * NAME : checkListCompleted
     * Argc : 3
     * Arguments = courseName,studentNumber,checkListTopic
     *  */ 
    
    let query = "CALL checklistcompleted(?,?,?)";
    configuration.connection.query(query,[courseName,studentNumber,checkListTopic],(err,results)=>{
        if(err){
          res.json({
            success:false,
            message:err
          });
        }else{
          res.json({
            success:true,
            message:"Succesfully updated",
            results
          }); 
        }
    });
});


checkListRouter.get('/checklist/delete',(req,res)=>{
  let courseName = req.query.courseName;
  let topic = req.query.topic;

  let deleteQuery = "CALL deletechecklist(?,?)";
  configuration.connection.query(deleteQuery,[courseName,topic],(err,row)=>{
    if(err){
      res.json({
        success:false,
        err
      });
    }else{
      res.json({
        success:true,
        message: "Checklist deleted successfully."
      });
    }
  });
});
module.exports = checkListRouter;

// mysql -uroot -ppassword student_survey_db