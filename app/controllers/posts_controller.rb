class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json: {post: post} # json形式でpostをjsにレスポンスとして返す記述
  end

    def checked
      post = Post.find(params[:id]) # ルーティングのURLからパラメーターを取得
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id]) # 更新したレコードを取得し直す
    render json: { post: item } # JSON形式としてchecked.jsにitemを返却(レスポンス)。checked.js側ではpostで受け取る。
  end

end
