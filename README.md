# Email Subscription Microservice 

<!--[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://awesome-email-subs.herokuapp.com/)
&nbsp;-->

An email subscription modal that sends an email to you when you subscribe and stores the email in a database. 

## Tech stack used
<table width="100%" style='border:none'>
  <tbody>
    <tr valign="top" align='center'>
      <td width="15%" align="left">
        <img height="32px" src="https://cdn.svgporn.com/logos/mongodb.svg">
      </td>
      <td width="16%" align="center">
        <img height="32px" src="https://cdn.svgporn.com/logos/express.svg">
      </td>
      <td width="15%" align="center">
        <img height="32px" src="https://cdn.svgporn.com/logos/react.svg">
      </td>
      <td width="15%" align="center">
        <img height="32px" src="https://cdn.svgporn.com/logos/nodejs-icon.svg">
      </td>
    </tr>
  </tbody>
</table>

## Features
- Enter the your email address to receive a welcome email from "Everything Dogs". 
- Access `/emails` to fetch data of all the emails within the database. To keep things confidential, most of the user name of your email will be filtered with a `'*'`.

## Setup
- `npm install` to install the packages
- Create a `.env` file and populate the values for the following keys: `MONGO_URI`, `MJ_APIKEY_PUBLIC`, `MJ_APIKEY_PRIVATE`, `WHO_IS_XML_API`
  - Note that this project uses 2 APIs: MailerJet and Whoisxmlapi. Be sure to make an account with them in order to obtain the keys.
  - MongoDB was used for this project so for the `MONGO_URI`, you should use the url provided by Mongo Atlas or your local one.
- `npm build` to build the package.
- `npm start` to run the server and move on to `localhost:3000`. Or you can set your own within the `.env` file using the `PORT` key.
