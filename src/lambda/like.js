import faunadb from 'faunadb';

const query = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  client.query(
    query.Update(
      query.Select("ref", query.Get(
        query.Match(
          query.Index("post_by_id"), 
          1
        )
      )),
      {
        data: {
          likes: query.Add(
            query.Select(
              ['data', 'likes'],
              query.Get(
                query.Select(
                  "ref",
                  query.Get(
                    query.Match(
                      query.Index("post_by_id"), 1
                    )
                  )
                )
              )
            ),
            1
          )
        }
      }
    )
  ).then((response) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({likes: response.data.likes})
    })
  }).catch((e) => {
    console.log("Erro", e)
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: 'Erro interno'})
    })
  })
}