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
  console.debug("generateStoryMarkup", story);

  // TODO: Check if the story.storyId is already favorited
  //  if so, give a filled star
  //  else, give it a empty star

  // const $starStatus = $("<i>", { class: "bi" });
  const hostName = story.getHostName();

  return $(`
  <li id="${story.storyId}">
  <i class= "bi bi-star">
    <a href="${story.url}" target="a_blank" class="story-link">
      ${story.title}
    </a>
    <small class="story-hostname">(${hostName})</small>
    <small class="story-author">by ${story.author}</small>
    <small class="story-user">posted by ${story.username}</small>
  </li>
`);

  // currentUser.favorites.map(function(){
  //   return $(`
  //   <li id="${story.storyId}">
  //   <i class= "bi bi-star-fill">
  //     <a href="${story.url}" target="a_blank" class="story-link">
  //       ${story.title}
  //     </a>
  //     <small class="story-hostname">(${hostName})</small>
  //     <small class="story-author">by ${story.author}</small>
  //     <small class="story-user">posted by ${story.username}</small>
  //   </li>
  // `);
  // });

  // // for (let favStory of currentUser.favorites) {

  //   if (story.storyId === favStory.storyId) {
  //     return $(`
  //     <li id="${story.storyId}">
  //     <i class= "bi bi-star-fill">
  //       <a href="${story.url}" target="a_blank" class="story-link">
  //         ${story.title}
  //       </a>
  //       <small class="story-hostname">(${hostName})</small>
  //       <small class="story-author">by ${story.author}</small>
  //       <small class="story-user">posted by ${story.username}</small>
  //     </li>
  //   `);
  //   } else {
  //     return $(`
  //     <li id="${story.storyId}">
  //     <i class= "bi bi-star">
  //       <a href="${story.url}" target="a_blank" class="story-link">
  //         ${story.title}
  //       </a>
  //       <small class="story-hostname">(${hostName})</small>
  //       <small class="story-author">by ${story.author}</small>
  //       <small class="story-user">posted by ${story.username}</small>
  //     </li>
  //   `);;
  //   }
  // }

  // return $(`
  //     <li id="${story.storyId}">
  //     <i class= "bi bi-star">
  //       <a href="${story.url}" target="a_blank" class="story-link">
  //         ${story.title}
  //       </a>
  //       <small class="story-hostname">(${hostName})</small>
  //       <small class="story-author">by ${story.author}</small>
  //       <small class="story-user">posted by ${story.username}</small>
  //     </li>
  //   `);
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

/**
 * submitNewStory() takes the submit form values, passes it into addStory() to create
 * a newStory.
 * newStory is used to create a new HTML markup $story
 * $story is prepended to $allStoriesList in the DOM
 */

async function submitNewStory(evt) {
  console.debug("submitNewStory ran! congrats guys");
  evt.preventDefault();

  const author = $('#create-author').val();
  const title = $('#create-title').val();
  const url = $('#create-url').val();

  // we need to grab the user so that we can get the token
  console.log("author", author);
  console.log("title", title);
  console.log("url", url);

  // using the currentUser global variable from the user.js file
  const newStory = await storyList.addStory(currentUser, { title, author, url });
  console.log("newStory", newStory);
  const $story = generateStoryMarkup(newStory);

  $allStoriesList.prepend($story);
}

$("#story-submit-button").on("click", submitNewStory);

/**
 * Generate the HTML for each favorited story and show only favorites list on page
 */

function putFavsOnPage() {
  console.log("putFavsOnPage run");
  $allStoriesList.hide();
  $favoritedStoriesList.empty();

  for (let favStory of currentUser.favorites) {
    const $favStory = generateStoryMarkup(favStory);
    // TODO: check if
    $favoritedStoriesList.append($favStory);
  }


  $favoritedStoriesList.show();
}


async function clickFavoriteIcon(evt) {

  const $target = $(evt.target);
  console.log($target, "evt.target as jQuery");

  console.log(evt.target.parentElement);
  const $evtTargetParentElement = $(evt.target.parentElement);
  console.log($evtTargetParentElement, "jQuery Object");
  console.log(typeof $evtTargetParentElement);


  const storyId = $evtTargetParentElement.attr("id");
  console.log(storyId);
  console.log(typeof storyId);

  // TODO: Get story by id
  // which we then pass to the .addFavorite and the .removeFavorite
  const story = await Story.getStoryById(storyId);

  if ($target.hasClass("bi-star")) {
    $target.removeClass("bi-star");
    $target.addClass("bi-star-fill");
    await currentUser.addFavorite(story);
  } else {
    $target.removeClass("bi-star-fill");
    $target.addClass("bi-star");
    await currentUser.removeFavorite(story);
  }


  // if (story.favoriteStatus === false) {
  //   $favoriteIcon.removeClass("bi-star");
  //   $favoriteIcon.addClass("bi-star-fill");
  //   story.favoriteStatus = true;
  //   currentUser.addFavorite(storyId);
  // } else {
  //   $favoriteIcon.removeClass("bi-star-fill");
  //   $favoriteIcon.addClass("bi-star");
  //   story.favoriteStatus = false;
  //   currentUser.removeFavorite(storyId);
  // }
}



$allStoriesList.on("click", ".bi", clickFavoriteIcon);
