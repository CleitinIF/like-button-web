import faunadb from 'faunadb';

const query = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  // console.log(event);
  client.query(
    query.Select("data", query.Get(
      query.Match(
        query.Index("post_by_id"), 
        1
      )
    ))
  ).then((data) => {
    console.log(JSON.stringify(data))
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  }).catch((e) => {
    console.log("Erro", e)
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: 'Erro interno'})
    })
  })
}