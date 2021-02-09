function check() {
  const posts = document.querySelectorAll(".post")

  posts.forEach(function (post) {
    // setIntervalにより起こる重複を回避している
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // メインの処理
    post.addEventListener('click', () => {
      const postId = post.getAttribute("data-id")
      // オブジェクトを生成
      const XHR = new XMLHttpRequest();
      // XMLHttpRequestのリクエスト内容を指定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式をあらかじめ指定
      XHR.responseType = "json";
      // サーバーへリクエストを送信
      XHR.send();
      // checked.jsに、レスポンスがあった場合の処理
      XHR.onload = () => {
        // レスポンスがエラーだった時
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        // レスポンスが正常な時
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}

setInterval(check, 1000);