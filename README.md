<h1>X-it is a lightweight customized application, thats integrates with Google Calendar, allowing users to anonymously vote out of unwanted meetings</h1>

---

Hello you!

Welcome to X-it; My final solo assignment, completed as a student at [Enspiral Dev Academy, Wellington](https://devacademy.co.nz/).

<h1>This repository contains:</h1>

- The code for the X-it plug-in, which is currently in testing mode and can be installed using Google’s Apps Script CLI, [Clasp](https://codelabs.developers.google.com/codelabs/clasp/#2).

- The [X-it launch site](https://x-it.vercel.app/), which has a sign-up sheet for Beta testers and stats on meetings cancelled so-far.

---

X-it Google plug-in

<i>This app allows users to vote anonymously to cancel events from their google calendar.
If every member votes to cancel, the event is removed and a notification is sent to the members, informing them that the event has been cancelled.</i>

Interface + under the hood

- <b>Google Apps Script</b> provides the user interface/integrates the app with Google Calendar
- <b>clasp codelab </b> manages deployment and updates to the plu-in
- <b>Fauna</b> performs as a document-relational database that stores and manages calendar data + provides api routes and functions connected to the database
- <b>Next</b> and <b>React.js</b> hosts the api routes queried by the Apps Script code
- <b>Graphql</b> executes DB queries

[X-it launch site](https://x-it.vercel.app/)

This website was created as a presentation tool for this project, with a simple sign-up form that stores Beta testing users to the fauna database on request.

The video was created using <b>iMovie</b>, screen-recordings of <b>x-it</b> running on my Google Calendar and stock footage from pexels.com.

Interface + under the hood

- <b>Next</b> and <b>React.js</b> handles the rendering, content and routes for the website (and API routes to the db)
- <b>Graphql</b> is used again to query the data stored on our <b>Fauna</b> backend.
- <b>Chakra Ui</b> was used for styling

---

<br>
Try X-it
<br>
In your terminal:

- git clone git@github.com:HannahBeattie/x-it.git
- cd x-it
- cd googleAddOn
- npm install
- npx class login
- npx clasp create --title x-it --rootDir ./src
- mv ./src/.clasp.json.
  <br>

<b>At this point you will probably get a spooky-looking error message that says 'User has not enabled the App Script API.

Don't panic! Simply follow the link and enable the app on the google script website.

Then</b>

Return to your terminal:

- npx clasp push
- npx clasp open

This should open the webpage ( script.google.com )

- open the editor and click the "Run" button once
- click the "Deploy" button, select "Test Deployments", click "Install"

<br>
That's it, You did it!

Unless you didn't... in which case open an issue in github and I will get back to you as soon as possible.
Happy cancelling!
<br>
