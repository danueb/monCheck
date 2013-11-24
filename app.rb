require 'bundler'
Bundler.require

class Moncheck < Sinatra::Base
  configure do
    set :assets, (Sprockets::Environment.new { |env|
      env.append_path(settings.root + "/assets/images")
      env.append_path(settings.root + "/assets/javascripts")
      env.append_path(settings.root + "/assets/stylesheets")

      if ENV["RACK_ENV"] == "production"
        env.js_compressor  = YUI::JavaScriptCompressor.new
        env.css_compressor = YUI::CssCompressor.new
      end
    })
  end

  ## Models ##
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/moncheck_dev")

  # here be models

  DataMapper.finalize.auto_upgrade!

  ## Routing ##
  get '/' do
    erb :index
  end

  get '/test' do
    erb :test
  end

  get "/assets/scripts.js" do
    content_type("application/javascript")
    settings.assets["scripts.js"]
  end

  get "/assets/screen.css" do
    content_type("text/css")
    settings.assets["screen.css"]
  end

  %w{jpg png}.each do |format|
    get "/assets/:image.#{format}" do |image|
      content_type("image/#{format}")
      settings.assets["#{image}.#{format}"]
    end
  end
end
