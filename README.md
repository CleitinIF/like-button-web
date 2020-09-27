# Serverless like button

## Run yourself

1. Clone down the repository
  ```
    git clone https://github.com/CleitinIF/like-button-rock-content.git
  ```

2. Enter the repo directory
  ```
    cd like-button-rock-content
  ```

3. Install the dependencies
  ```
    npm install
  ```

4. Sign up for a FaunaDB account
  ```https://dashboard.fauna.com/accounts/register```

5. Create a database
    
    In the Fauna Cloud Console:
    - Click “New Database”
    - Enter “Netlify” as the “Database Name”
    - Click “Save”

6. Create a database access key

    In the Fauna Cloud Console:
    - Click “Security” in the left navigation
    - Click “New Key”
    - Make sure that the “Database” field is set to “Netlify”
    - Make sure that the “Role” field is set to “Admin”
    - Enter “Netlify” as the “Key Name”
    - Click “Save”

7. Copy the database access key’s secret

    Save the secret somewhere safe; you won’t get a second chance to see it.

8. Set your database access secret in your terminal environment

    In your terminal, run the following command:

    ```
      export FAUNADB_SECRET=YourFaunaDBSecretHere
    ```

    Replace YourFaunaDBSecretHere with the value of the secret that you copied in the previous step.

9. Bootstrap your FaunaDB collection and indexes

    ```
      npm run setup-database
    ```

10. Run project locally

    ```
      npx netlify-cli dev
    ```

    or

    ```
      npm install -g netlify-dev

      ntl dev
    ```

    and open http://localhost:3000
