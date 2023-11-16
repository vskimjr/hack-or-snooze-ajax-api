"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// TODO: Handle the submit button in the submit story form


async function submitNewStory(evt) {
  console.log("submitNewStory ran! congrats guys");
  evt.preventDefault();

  const author = $('#create-author').val();
  const title = $('#create-title').val();
  const url = $('#create-url').val();

  // we need to grab the user so that we can get the token
  console.log("author", author);
  console.log("title", title);
  console.log("url", url);

  // using the currentUser global variable from the user.js file
  await storyList.addStory(currentUser, { title, author, url });

  /* COMMENTED OUT BECAUSE THE FOLLOWING FAILS UNEXPECTEDLY
  const storyAuthor = $('#create-author').val();
  const storyTitle = $('#create-title').val();
  const storyURL = $('#create-url').val();

  await storyList.addStory(currentUser, { storyTitle, storyAuthor, storyURL })
  */
}

$("#story-submit-button").on("click", submitNewStory);