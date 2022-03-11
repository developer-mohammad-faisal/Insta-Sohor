let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    likedPostsId.push(id); 
    showPosts(posts);
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);
};

const displayContent = (text) => {
    return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        questionAnswere();
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
    }
};

const createPost = (post) => {
    const image = post.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${post.userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${post.comments[0].user}
                      </a>
                      ${post.comments[0].text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
  document.getElementById("question-answere").innerHTML = '';
  document.getElementById( "liked" ).innerHTML = '';
    const likedPosts = getLikedPosts();
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
  document.getElementById("question-answere").innerHTML = '';
    const reportedPosts = getReportedPosts();
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
  console.log(posts);
}

loadPosts();

const questionAnswere = () => {
  const container = document.getElementById("question-answere")
  container.innerHTML = `
      
  <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card shadow-lg rounded-2">
      <div class="card-body">
        <h5 class="card-title">How does work in javascript?</h5>
        <p class="card-text">Javascript হল একটি Scripting language. Browser এর Behaviour Control কে লক্ষ্য করে একে ডিজাইন করা হয়েছে। বর্তমানে এটি Browser ছাড়াও যেকোন Operating System Run করে।  এবং জাভাস্ক্রিপ্ট হল একটি হাই লেভেল Programming Language. Javascript Chrome Browser এর মধ্যে Execute করার জন্য V8 Engine Use করে। Microsoft Edge browser এর জন্য Chakra ইন্জিন use করে। Firefox browser এর জন্য Spidermonkey ইন্জিন করে। এখন কে কোন browser এর জন্য use করবে সেটা সম্পুর্ণ Web Developer এর উপর নির্ভর করে। HTML এর সাথে CSS, Javascript Code link করে DOM এর সাথে  Parse করে UI তে দেখানো হয়।</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow-lg rounded-2">
      <div class="card-body">
        <h5 class="card-title">How does the javascript event loop work?</h5>
        <p class="card-text">Javascript হল একটি Single Threated Language এবং Javascript Asynchronous Language ও বলা হয়। Javascript ইঞ্জিন কোডগুলো Asynchronous ভাবে একের পর এক Execute করে। অথবা আমরা চাইলে লাইনের মধ্যে setTimeout দিয়ে Asynchronous ভাবে মাঝখানে যদি একটা function কে setTimeOut দিয়ে একটা নির্দিষ্ট সময়ের পর আনতে পারি, এটিকে javascript engin এ নোট করে রাখবে, নির্দিষ্ট সময় পর function টাকে লাইনে ঢুকিয়ে দিবে। অন্যান্য Language এর সাথে জাভাস্ক্রিপ্টের পার্থক্য হল নন ব্লকিং বৈশিষ্ট্য। জাভাস্ক্রিপ্ট ইন্জিন কখনোই একসাথে একটার বেশি স্টেটমেন্ট প্রোসেস করবে না। এটাই হল জাভাস্ক্রিপ্ট ইভেন্ট লুপ।</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow-lg rounded-2">
      <div class="card-body">
        <h5 class="card-title">What will be different in Local storage and Session storage</h5>
        <p class="card-text"><span class="fw-bold">Local storage:</span> এর ডাটা স্হায়ী ভাবে ব্রাউজারে থাকে। যদি অন্য ট্যাবে বা ট্যবাটি যদি বন্ধ করে দেওয়া হয় তাও ডাটাগুলো ব্রাউজারে থাকবে। Event যদি পুরো কম্পিউটার টা অফ করে রিসেট দিয়েও ওই ট্যাবে যায় তাহলেও থেকে যাবে ডাটা। আর ডাটা গুলো key and value আকারে store থাকে ব্রাউজারে। value গুলো string হয়ে থাকে। আমরা চাইলে ডাটা গুলো কে Change, Update, বা নতুন ডাটা এড করতে পারি কোড করে।
         <span class="fw-bold">Session Storage:</span> এর ডাটা অস্হায়ী ভাবে থাকে ব্রাউজারে। সেই ট্যাবটা যদি ক্লোজ করে দেওয়া হয় তাহলে সেগুলো চলে যায়।  নির্দিষ্ট সময়ের জন্য ডাটা হুলো লোড হয়ে থাকে।</p>
      </div>
    </div>
  </div>
</div>
  `;
}
questionAnswere();