const pool = require('../modules/pool');
const csvFilePath='/Users/jonathan/Desktop/mayorsfoodcourt2.csv'
const csv=require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    
    //  for (i = 0; i < 3; i++) {
         
    //      let newLocation = jsonObj[i].Location.split(',')
    //         let  latitude= newLocation[0].split('(')
    //         let longitude = newLocation[1].split(')')
    //       console.log( latitude[1], longitude[0] )
        
    //  }
    (async () => {
        //creates async function
        const client = await pool.connect();
        // await will wait for a return on the given function and then do something
        try {
            await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
            for (i = 0; i < 5; i++) {
                let newLocation = jsonObj[i].Location.split(',')
            let  latitude= newLocation[0].split('(')
            let longitude = newLocation[1].split(')')
          
            let queryText = `INSERT INTO inspections ("inspection_id",
            "dba_name", 
           "aka_name",
           "license_number",
           "facility_type",
           "risk",
           "address",
           "city",
          "state",
           "zip",
           "inspection_date",
           "inspection_type",
           "results",
           "violations",
           "latitude",
           "longitude") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16);`;

             let result1 = await client.query(queryText, [ 
                jsonObj[i]['Inspection ID'],
                jsonObj[i]['DBAName'],
                jsonObj[i]['businessName'],
                jsonObj[i]['LICENSENO'],
                jsonObj[i]['DESCRIPT'],
                jsonObj[i]['ViolLevel'],
                jsonObj[i]['Address'],
                jsonObj[i]['CITY'],
                jsonObj[i]['STATE'],
                jsonObj[i]['ZIP'],
                jsonObj[i]['VIOLDTTM'],
                jsonObj[i]['Inspection Type'],
                jsonObj[i]['ViolStatus'],
                jsonObj[i]['ViolDesc'],
                latitude[1],
                longitude[0]])
            }
           
             await client.query('COMMIT');
                
                console.log('ok')
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                //will end connection to database
            };// end try/catch
        })().catch((error) => {
            console.log('CATCH org.leader.order.router.get', error);
            
        })
    
    
})
    
   
 