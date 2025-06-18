class Api::CartController < Api::ApiController
  def index
    @cart_items = current_cart.list.order(:id).page(params[:page]).per(10)
  end
end
