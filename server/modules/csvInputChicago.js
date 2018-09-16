const pool = require('../modules/pool');
const csvFilePath='/Users/jonathan/Desktop/Food_Inspections.csv'
const csv=require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
     
    (async () => {
        //creates async function
        const client = await pool.connect();
        // await will wait for a return on the given function and then do something
        try {
            await client.query('BEGIN') // tells DB to be ready for multiple lines of queries
            for (i = 0; i < 5; i++) {
                let risk;
                switch(jsonObj[i]['Risk']) {
                    case 'Risk 3 (Low)':
                        risk = 'Low'
                        break;
                    case 'Risk 2 (Medium)':
                        risk = 'Medium'
                        break;
                    case 'Risk 1 (High)':
                        risk = 'High'
                        break;
                    default:
                        risk = 'risk missing'
                }
            let queryText = `INSERT INTO inspections ("inspection_id",
            "dba_name", 
           "aka_name",
           "risk",
           "address",
           "city",
          "state",
           "zip",
           "inspection_date",
           "results",
           "latitude",
           "longitude") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`;

             let result1 = await client.query(queryText, [ 
                jsonObj[i]['Inspection ID'],
                jsonObj[i]['DBA Name'],
                jsonObj[i]['AKA Name'],
                risk,
                jsonObj[i]['Address'],
                jsonObj[i]['City'],
                jsonObj[i]['State'],
                jsonObj[i]['Zip'],
                jsonObj[i]['Inspection Date'],
                jsonObj[i]['Violations'],
                jsonObj[i]['Latitude'],
                jsonObj[i]['Longitude']])
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
    
   
 