var twitterEmojiContent = `
<article id="twitter-emoji-cloud" class="project-item">
<div>
    <div class="project-overview">
        <h2 class="project-title" id='twitter-emoji-title' tabindex="-1">TWITTER EMOJI CLOUD</h2>
        <h3>Full Stack Data Project</h3>
        <p class="project-caption">A group project that live-streamed data from the Twitter API and
            showed various visualizations.
        </p>
    </div>
    <div class="project-description">
        <p>Twitter Emoji Cloud is a full-stack project that I developed with three classmates for a
            course called Big Data Architecture. </p>
        <p>We used Java to build an Apache Storm topology which processed raw data from the Twitter
            Sample API to extract emojis from tweets and insert that data into a Cloud SQL database.
            Most of my work was done in this area and when we completed the topology, I containerized it
            using Docker and deployed to Google Kubernetes Engine.</p>
        <p>We used Express.js to write a RESTful API which exposed our Google Cloud SQL data to the
            front-end application. The API was deployed to Google App Engine.</p>
        <p>Our front-end visualizations used a library called ZingChart to show which emojis were
            trending on Twitter realtime and historically.</p>
        <p>This project is no longer hosted due to the hosting costs associated with Google Cloud
            Platform, but the code is fully accessible on GitHub. </p>
    </div>

    <div class="project-bullet-grid">
        <div>
            <h4>Key Features</h4>
            <ul>
                <li>Full-stack</li>
                <li>Google Cloud Platform Deployment</li>
                <li>GitHub Collaboration</li>
                <li>Data visualizations</li>
            </ul>
        </div>
        <div class="github-links">
            <div id="app-links">
                <a href="https://github.com/isheets/twitter-emoji-cloud" target="_blank">View on GitHub</a>
            </div>
        </div>
    </div>
</div>
</article>`;