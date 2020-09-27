import faunadb from 'faunadb';

import getId from './utils/getId';

const query = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  const id = getId(event.path)

  if(!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': 'https://zen-goodall-21fbd0.netlify.app/',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'You need to send the post id in url'})
    }
  }

  try {
    const {data} = await client.query(
      query.Update(
        query.Select("ref", query.Get(
          query.Match(
            query.Index("post_by_id"), 
            Number(id)
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
                        query.Index("post_by_id"), 
                        Number(id)
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
    )
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://zen-goodall-21fbd0.netlify.app/',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({likes: data.likes})
    }
  } catch (error) {
    console.log(error)

    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': 'https://zen-goodall-21fbd0.netlify.app/',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'Internal error'})
    }
  }
}