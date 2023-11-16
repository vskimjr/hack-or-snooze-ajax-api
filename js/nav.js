"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// TODO: handle submit nav link click
// create the function
//  stop the default link behavior
//  show the submit form
//
// add the event listener

/**
 * Update the DOM to show the #submit-form when clicking the submit link
 */

function showSubmitFormOnNavLinkClick(evt) {
  console.log("showSubmitFormOnNavLinkClick called", evt);
  evt.preventDefault();
  $submitForm.show();
}

$("#nav-submit-story").on("click", showSubmitFormOnNavLinkClick);



// TODO: Handle the submit button in the submit story form

// TODO: handle favorites link click
// create the function
// add the event listener

// TODO: handle my stories link click
// create the function
// add the event listener

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
