require 'fx/messenger'

class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def notify
    FX::Messenger.notify_user(params)

    redirect_to root_path
  end
end
