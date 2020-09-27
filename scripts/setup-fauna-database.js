const readline = require('readline')
const faunadb = require('faunadb')
const insideNetlify = insideNetlifyBuildContext()
const query = faunadb.query

console.log("Creating FaudaDB Database...\n");

if(!process.env.FAUNADB_SECRET) {
  console.log("[error] - FAUNADB_SECRET environment variable not found.\n");

  if (insideNetlify) {
    console.log(`Visit https://app.netlify.com/sites/YOUR_SITE_HERE/settings/deploys`)
    console.log('and set a `FAUNADB_SECRET` value in the "Build environment variables" section')
    process.exit(1)
  }

    // Local machine warning
    if (!insideNetlify) {
      console.log()
      console.log('You can create fauna DB keys here: https://dashboard.fauna.com/db/keys')
      console.log()
      ask('Enter your faunaDB server key', (err, answer) => {
        if (!answer) {
          console.log('Please supply a faunaDB server key')
          process.exit(1)
        }
        createFaunaDB(process.env.FAUNADB_SECRET)
      });
    }
} else {
  createFaunaDB(process.env.FAUNADB_SECRET)
}

function createFaunaDB(key) {
  const client = new faunadb.Client({
    secret: key
  });

  /* Based on your requirements, change the schema here */

  return client.query(query.CreateCollection({
    name: 'posts'
  })).then(() => {
    return client.query(query.Create(query.Collection('posts'), {
      data: {
        id: 1,
        name: 'Serverless button :)',
        likes: 0
      }
    })).then(() => {
      return client.query(query.CreateIndex({
        name: 'post_by_id',
        source: query.Collection('posts'),
        terms: [{field: ["data", "id"]}]
      }))
    })
  }).catch(e => {
    console.log(e)
  })
}

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(question + '\n', function(answer) {
    rl.close();
    callback(null, answer);
  });
}