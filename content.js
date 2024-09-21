let keywordsToHide = [];


chrome.storage.local.get(['keywordsToHide'], function(result) {
    if (result.keywordsToHide) {
        keywordsToHide = result.keywordsToHide; 
    }
    hidePosts(); 
});


function hidePosts() {
    const posts = document.querySelectorAll('div[data-testid="post_message"], div[data-testid="post_container"], div[role="article"]'); 

    posts.forEach(post => {
        const postText = post.innerText.toLowerCase(); 

       
        keywordsToHide.forEach(keyword => {
            if (postText.includes(keyword.toLowerCase())) {
                post.style.display = 'none'; 
            }
        });
    });
}


const observer = new MutationObserver(hidePosts);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
