const pool = require('../modules/pool');
const csvFilePath='/Users/jonathan/Desktop/sanFranInspections.csv'
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
                switch(jsonObj[i]['risk_category']) {
                    case 'Low Risk':
                        risk = 'Low'
                        break;
                    case 'Moderate Risk':
                        risk = 'Medium'
                        break;
                    case 'High Risk':
                        risk = 'High'
                        break;
                    default:
                        risk = 'risk missing'
                }
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
                jsonObj[i]['inspection_id'],
                jsonObj[i]['business_id'],
                jsonObj[i]['business_name'],
                jsonObj[i]['inspection_id'],
                jsonObj[i]['Facility Type'],
                risk,
                jsonObj[i]['business_address'],
                jsonObj[i]['business_city'],
                jsonObj[i]['business_state'],
                jsonObj[i]['business_postal_code'],
                jsonObj[i]['inspection_date'],
                jsonObj[i]['nspection_type'],
                jsonObj[i]['inspection_score'],
                jsonObj[i]['violation_description'],
                jsonObj[i]['business_latitude'],
                jsonObj[i]['business_longitude']])
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