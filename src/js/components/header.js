export default function($document) {

  // Create the header. This will live outside the passage container.
  const $storyHeaderContainer = $('<div id="story-header" class="chapter-header"></div>');
  const $chatperTitle = $('<h2>');
  const $chatperSubTitle = $('<h3>');
  $storyHeaderContainer.append($chatperTitle);
  $storyHeaderContainer.append($chatperSubTitle);
  $('#story').prepend($storyHeaderContainer);

  // passageinitproperties is triggered in title-match-properties.js
  $document.on(':passageinitproperties', (event, { title, section, chapter }) => {

    const header = [ chapter, title ]
      .filter(s => !!s)
      .join(' - ');

    if(header) {
      $chatperTitle.text(header).show();
    } else {
      $chatperTitle.text('').hide();
    }
    if(section) {
      $chatperSubTitle.text(section).show();
    } else {
      $chatperSubTitle.text('').hide();
    }
    if($storyHeaderContainer.text().trim() === '') {
      $storyHeaderContainer.hide();
    } else {
      $storyHeaderContainer.show();
    }
  });

};