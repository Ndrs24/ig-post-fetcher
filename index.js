if (typeof window === undefined) {
  throw new Error("This script must be run in the browser");
}

const url = new URL(window.location.href);

if (url.origin !== "https://www.instagram.com") {
  throw new Error("This script must be run on Instagram");
}

if (url.pathname.split("/")[1] !== "p") {
  throw new Error("This script must be run on a post");
}

url.search = new URLSearchParams({ __a: 1, __d: "dis" }).toString();

const result = await fetch(url);

if (!result.ok) {
  throw new Error("Failed to fetch post");
}

const data = await result.json();

if (!data.items[0]) {
  throw new Error("Uknow fetch data");
}

const post = data.items[0];

if (post.media_type === 8) {
  const imageUrls = post.carousel_media.map(
    (v) => v.image_versions2.candidates[0].url
  );

  imageUrls.forEach((url) => {
    console.log(url);
  });
} else if (post.media_type === 2) {
  const videoUrl = post.video_versions[0].url;
  console.log(videoUrl);
} else if (post.media_type === 1) {
  const imageUrl = post.image_versions2.candidates[0].url;
  console.log(imageUrl);
} else {
  throw new Error("This script must be run on a post with an image or video");
}
